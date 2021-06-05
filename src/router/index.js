import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import NotesManager from "@/components/NotesManager";
import NoteDetails from "@/components/NoteDetails";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/notes/:noteId",
      name: "NoteDetails",
      component: NoteDetails
    },
    {
      path: "/notes-manager",
      name: "NotesManager",
      component: NotesManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

export default router;
