import axios from "../axios/axios";
import config from "../config/config";
import Note from "../models/note";

const NOTES = "/notes";

export async function fetchLoggedUserNotes(userId, pageIdx) {
  const search = {
    sort: [
      {
        editedAt: { order: "desc", format: "strict_date_optional_time_nanos" }
      }
    ],
    from: pageIdx * config.notesManagerPageSize,
    size: config.notesManagerPageSize,
    query: {
      match: {
        author: userId
      }
    }
  };
  return fetchNotes(pageIdx, search);
}

export function fetchPublicNotes(searchOptions) {
  const pageIdx = searchOptions.pageIdx || 0;
  const query = prepareQuery(searchOptions);

  const search = {
    sort: [
      {
        editedAt: { order: "desc", format: "strict_date_optional_time_nanos" }
      }
    ],
    from: pageIdx * config.publicPageSize,
    size: config.publicPageSize,
    query: query,
    script_fields: {
      // read only 1 image for displaying in the cards
      pictures: {
        script: {
          lang: "painless",
          source:
            "if (params['_source']['pictures'].size() == 0) {return []}else {return params['_source']['pictures'][0]}"
        }
      }
    },
    _source: ["title", "createdAt", "status", "editedAt", "categories"]
  };
  return fetchNotes(pageIdx, search);
}

async function fetchNotes(pageIdx, payload) {
  try {
    const { data } = await axios.post(NOTES + "/_doc/_search", payload);
    if (!data.hits.hits || data.hits.hits.length === 0) {
      return {
        notes: [],
        total: data.hits.total.value,
        pageIdx
      };
    }
    const notes = data.hits.hits.map(hit => {
      const note = new Note({
        ...hit._source,
        id: hit._id
      });

      if (hit.fields) {
        note.pictures = hit.fields.pictures;
      }
      return note;
    });
    return {
      notes,
      total: data.hits.total.value,
      pageIdx
    };
  } catch (err) {
    console.log(err);
    throw new Error(
      err.message
        ? err.message
        : "Sorry, could not load notes. Please try again later."
    );
  }
}

export async function fetchNoteDetails(id) {
  try {
    const { data } = await axios.get(NOTES + "/_doc/" + id);
    if (!data.found) {
      return null;
    }

    return new Note({
      id: data._id,
      author: data._source.author,
      title: data._source.title,
      categories: data._source.categories,
      pictures: data._source.pictures,
      status: data._source.status,
      desc: data._source.desc,

      createdAt: data._source.createdAt,
      editedAt: data._source.editedAt
    });
  } catch (err) {
    console.log(err);
    throw new Error(
      err.message
        ? err.message
        : "Sorry, could not load Your note. Please try again later"
    );
  }
}

function prepareQuery(searchOptions) {
  const must = [];
  if (searchOptions.title) {
    must.push({ match: { title: { query: searchOptions.title } } });
  }
  if (searchOptions.status && searchOptions.status !== "ALL") {
    must.push({
      match: {
        status: searchOptions.status
      }
    });
  }

  const query = {
    bool: { must }
  };
  return query;
}
