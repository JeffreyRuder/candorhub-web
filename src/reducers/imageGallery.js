const initialState = {
  imagesForGallery: [{
    title: '',
    image: '',
    description: '',
    user: {
      id: "",
      username:"",
      email:""
    }
  }],

  imagesByUser: [{
    title: '',
    image: '',
    description: '',
    user: {
      id: "",
      username: "",
      email: ""
    }
  },

    {
      title: '',
      image: '',
      description: '',
      user: {
        id: "",
        username: "",
        email: ""
      }
    },
  ],

  imageById: {
    title: '',
    description: '',
    image: '',
    user: {
      id: "",
      username: "",
      email: ""
    },
    questions: [{
      id: '',
      body: '',
      comments: [{
        id: '',
        body: ''
      }],
    }],
  },
}

//get specific image for gallery view
function setImageById(state, responseJSON) {
  return {...state, imageById: responseJSON};
}

//image gallery
function setImageGallery(state, responseJSON) {
  return { ...state, imagesForGallery: responseJSON};
}

//user specific image gallery
function setUserGallery(state, responseJSON) {
  return { ...state, imagesByUser: responseJSON};
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_IMAGE_GALLERY':
      return setImageGallery(state, action.responseJSON);
    case 'SET_IMAGE_BY_ID':
      return setImageById(state, action.responseJSON);
    case 'SET_USER_GALLERY':
      return setUserGallery(state, action.responseJSON);
    default:
      return state;
  }
}
