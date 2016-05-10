import {Map} from 'immutable';
import $ from 'jquery';

const initialState = Map({
  signedIn: false,
  showCommentForm: true,
  displayComments: false,
  imageForCritique: {
    title: '',
    url: '',
    description: ''
  },
  questionsForComment: [{
    id: 0,
    body: ''
  }, {
    id: 0,
    body: ''
  }, {
    id: 0,
    body: ''
  }]
});

function setState(state, newState) {
  return state.merge(newState);
}

function signIn(state) {
  return state.set('signedIn', true);
}

function setImageToCritique(state, responseJSON) {
  return state.set('imageForCritique', responseJSON.images[0]);
}

function setQuestionsForComment(state, responseJSON) {
  console.log(responseJSON);
  return state.set('questionsForComment', responseJSON.questions);
}

function commentSubmitted(state, responseJSON) {
  return state.set('commentSubmitted', true);
}

function hideForm(state) {
  return state.set('showCommentForm', false);
}

function displayComments(state) {
  return state.set('displayComments', true);
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'SIGN_IN':
      return signIn(state);
    case 'SET_IMAGE_TO_CRITIQUE':
      return setImageToCritique(state, action.responseJSON);
    case 'COMMENT_SUBMITTED':
      return commentSubmitted(state, action.responseJSON);
    case 'SET_QUESTIONS_FOR_COMMENT':
      return setQuestionsForComment(state, action.responseJSON);
    case 'HIDE_FORM':
      return hideForm(state);
    case 'DISPLAY_COMMENTS':
      return displayComments(state);
    }
  return state;
}
