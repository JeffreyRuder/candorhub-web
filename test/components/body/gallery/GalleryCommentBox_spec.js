import React from 'react';
import ReactDOM from 'react-dom';
import GalleryCommentBox from '../../../../src/components/body/gallery/GalleryCommentBox';
import {expect} from 'chai';
import sd from 'skin-deep';

const testQuestion = {
  id: 0,
  body: "Who's on first?",
  comments: [
    {
      id: 0,
      body: "I don't know.",
      user: {
        username: "firstTestUser"
      }
    },
    {
      id: 1,
      body: "Third base.",
      user: {
        username: "secondTestUser"
      }
    }
  ]
};

describe("GalleryCommentBox", () => {
  let tree, instance, vdom;

  beforeEach(() => {
    tree = sd.shallowRender(<GalleryCommentBox question={testQuestion} />);
    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();
  });

  it("renders a comment list", () => {
    expect(tree.props.className).to.contain("comments__comment-box");
  });

  it("renders a comment box for each comment", () => {
    expect(tree.everySubTree(".comments").length).to.equal(2);
  });

  it("passes content to the comment boxes", () => {
    expect(tree.dive(['.comments', '.comments__body']).text()).to.equal("I don't know.");
  })
})
