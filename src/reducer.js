import $ from 'jquery';

const initialState = {
  signedIn: false,
  showCommentForm: true,
  displayComments: false,
  imageForCritique: {
    title: '',
    description: '',
    image: {
      url: ''
    }
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
};

function setState(state, newState) {
  return {...state, ...newState};
}

function signIn(state) {
  return { ...state, signedIn: true};
}

function setImageToCritique(state, responseJSON) {
  return { ...state, imageForCritique: responseJSON.images[0]};
}

function setQuestionsForComment(state, responseJSON) {
  return { ...state, questionsForComment: responseJSON.questions};
}

function commentSubmitted(state, responseJSON) {
  return { ...state, commentSubmitted: true}
}

function hideForm(state) {
  return { ...state, showCommentForm: false};
}

function displayComments(state) {
  return { ...state, displayComments: true};
}

function isUploadingImage(state) {
  return { ...state,  isUploadingImage: true }
}

function doneUploadingImage(state) {
  return { ...state, isUploadingImage: false }
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
    case 'SET_SIGNED_URL':
      return setSignedUrl(state, action.responseJSON);
    case 'IS_UPLOADING_IMAGE':
      return isUploadingImage(state);
    case 'DONE_UPLOADING_IMAGE':
      return doneUploadingImage(state);
    }
  return state;
}
