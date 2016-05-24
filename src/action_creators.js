import fetch from 'isomorphic-fetch';

const apiRoot = "http://candorhub-api.herokuapp.com/v1/"
const randomImageEndpoint = apiRoot + "images?count=1";
const specificImageEndpoint = apiRoot + "images/";
const submitCommentEndpoint = apiRoot + "comments";
const getQuestionsEndpoint = apiRoot + "questions?count=3";
const uploadImageEndpoint = "";
const multipleRandomImagesEndpoint = apiRoot + "/images";
const imageUploadEndpoint = apiRoot + "images";


export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function hideForm(state) {
  return {
    type: 'HIDE_FORM',
    state
  }
}

export function displayComments(state) {
  return {
    type: 'DISPLAY_COMMENTS',
    state
  }
}

export function commentSubmitted(state, responseJSON) {
  return {
    type: 'COMMENT_SUBMITTED',
    state,
    responseJSON
  }
}

export function setImageToCritique(state, responseJSON) {
  return {
    type: "SET_IMAGE_TO_CRITIQUE",
    state,
    responseJSON
  };
}

//get image for image gallery view
export function setImageById(state, responseJSON) {
  return {
    type: "SET_IMAGE_BY_ID",
    state,
    responseJSON
  };
}

export function setQuestionsForComment(state, responseJSON) {
  return {
    type: 'SET_QUESTIONS_FOR_COMMENT',
    state,
    responseJSON
  }
}

export function setImageGallery(state, responseJSON) {
  return {
    type: 'SET_IMAGE_GALLERY',
    state,
    responseJSON
  }
}

export function setUserGallery(state, responseJSON) {
  return {
    type: 'SET_USER_GALLERY',
    state,
    responseJSON
  }
}

export function setQuestionsForComment(state, responseJSON) {
  return {
    type: 'SET_QUESTIONS_FOR_COMMENT',
    state,
    responseJSON
  }
}


export function postSubmitComment(body) {
  return function (dispatch, getState) {
    const state = getState();
    return fetch(submitCommentEndpoint, {
      method: 'POST',
      headers: {
        'ACCEPT': 'application/json',
        'CONTENT_TYPE': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(responseJSON => {
      dispatch(commentSubmitted(state, responseJSON)),
      dispatch(hideForm(state)),
      dispatch(displayComments(state)),
      dispatch(getSpecificImageFromServer(state, state.imageForCritique.id))
    });
  }
}

export function postSubmitCommentGallery(body) {
  return function (dispatch, getState) {
    const state = getState();
    return fetch(submitCommentEndpoint, {
      method: 'POST',
      headers: {
        'ACCEPT': 'application/json',
        'CONTENT_TYPE': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(responseJSON => {
      dispatch(commentSubmitted(state, responseJSON)),
      dispatch(getImageFromServerById(state.imageGallery.imageById.id))
    });
  }
}

export function getRandomImageFromServer(state) {
  return function (dispatch) {
    return fetch(randomImageEndpoint)
    .then(response => response.json())
    .then(responseJSON => {
      dispatch(setImageToCritique(state, responseJSON)),
      console.log(responseJSON)
    });
  }
}

//image gallery
export function getMultipleImagesFromServer(state) {
  return function (dispatch) {
    return fetch(multipleRandomImagesEndpoint)
    .then(response => response.json())
    .then(responseJSON => dispatch(setImageGallery(state, responseJSON)));
  }
}


//get specific image for critique
export function getSpecificImageFromServer(state, id) {
  return function (dispatch) {
    return fetch (specificImageEndpoint + id)
    .then(response => response.json())
    .then(responseJSON => dispatch(setImageToCritique(state, responseJSON)));
  }
}

//get specific image for gallery view
export function getImageFromServerById(id) {
  return function(dispatch, getState) {
    const state = getState();
    return fetch (specificImageEndpoint + id)
    .then(response => response.json())
    .then(responseJSON => dispatch(setImageById(state, responseJSON)));
  }
}

//get images associated with a particular user
export function getImagesByUser() {
  return function(dispatch, getState) {
    const state = getState();
    const url = apiRoot + "/users/" + state.auth.getIn(["user", "attributes", "id"]) + "/images";
    console.log(url);
    return fetch (url)
    .then(response => response.json())
    .then(responseJSON => dispatch(setUserGallery(state, responseJSON)));
  }
}

export function getQuestionsForComment(state) {
  return function (dispatch) {
    return fetch(getQuestionsEndpoint)
    .then(response => response.json())
    .then(responseJSON => dispatch(setQuestionsForComment(state, responseJSON)));
  }
}

export function startImageUpload(image, title, description, tags, userId) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({type: 'IS_UPLOADING_IMAGE', state})
    const imageForUpload = {
      image: {
        image: image,
        title: title,
        description: description,
        tags: tags,
        user_id: userId
      }
    }
    return fetch(imageUploadEndpoint, {
      method: 'POST',
      headers: {
        'ACCEPT': 'application/json',
        'CONTENT_TYPE': 'application/json'
      },
      body: JSON.stringify(imageForUpload)
    })
    .then(response => response.json())
    .then(responseJSON => dispatch(onFinishedImageUpload(state, responseJSON)),
                          dispatch({type: 'DONE_UPLOADING_IMAGE', state}));
  }
}

export function onFinishedImageUpload(state, responseJSON) {
  return {
    type: "ON_FINISHED_IMAGE_UPLOAD",
    state,
    responseJSON
  }
}
