import { defineStore } from 'pinia';
import { ref } from 'vue';

interface State {
  userId: string | undefined;
}

export const useUserStore = defineStore('user', () => {
  const userId = ref<State['userId']>(undefined);

  function changeUserId(newUserId: State['userId']): void {
    userId.value = newUserId;
  }

  return {
    userId,
    changeUserId
  };
});


/**
 * import { createStore } from 'vuex'
import { ActionContext } from 'vuex';

interface State {
  userId: number | undefined;
}

type basicContext = ActionContext<State, State>

export default createStore<State>({
  state: {
    userId: undefined,
  },
  getters: {
    GET_USER_ID(state: State): State['userId'] {
      return state.userId;
    }
  },
  mutations: {
    SET_USER_ID(state: State, newUserId: State['userId']): void {
      state.userId = newUserId;
    }
  },
  actions: {
    changeUserId(context: basicContext, newUserId: State['userId']) {
      context.commit('SET_USER_ID', newUserId);
    }
  },
  modules: {
  }
})
 */