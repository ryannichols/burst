import React from 'react';
import _ from 'lodash';
import withSideEffect from 'react-side-effect';

var HEADER_ATTRIBUTE = "data-react-header";
var TAG_NAMES = {
  META: "meta",
  LINK: "link",
};
var TAG_PROPERTIES = {
  NAME: "name",
  CHARSET: "charset",
  HTTPEQUIV: "http-equiv",
  REL: "rel",
  HREF: "href",
  PROPERTY: "property",
  CONTENT: "content"
};
var getInnermostProperty = (propsList, property) => {
  return _.result(_.find(propsList.reverse(), property), property);
};

var getTitleFromPropsList = (propsList) => {
  var innermostTitle = getInnermostProperty(propsList, "title");
  var innermostTemplate = getInnermostProperty(propsList, "titleTemplate");
  if (innermostTemplate && innermostTitle) {
      return innermostTemplate.replace(/\%s/g, innermostTitle);
  }
  return innermostTitle || "";
};
var getBodyIdFromPropsList = (propsList) => {
  var bodyId = getInnermostProperty(propsList, "bodyId");
  return bodyId;
};
var getBodyClassesFromPropsList = (propsList) => {
  return propsList
    .filter(props => props.bodyClasses && Array.isArray(props.bodyClasses))
    .map(props => props.bodyClasses)
    .reduce((classes, list) => classes.concat(list), []);
};
var getTagsFromPropsList = (tagName, uniqueTagIds, propsList) => {
  // Calculate list of tags, giving priority innermost component (end of the propslist)
  var approvedSeenTags = {};
  var validTags = _.keys(TAG_PROPERTIES).map(key => TAG_PROPERTIES[key]);

  var tagList = propsList
    .filter(props => props[tagName] !== undefined)
    .map(props => props[tagName])
    .reverse()
    .reduce((approvedTags, instanceTags) => {
      var instanceSeenTags = {};

      instanceTags.filter(tag => {
        for(var attributeKey in tag) {
          var value = tag[attributeKey].toLowerCase();
          var attributeKey = attributeKey.toLowerCase();

          if (validTags.indexOf(attributeKey) == -1) {
              return false;
          }
          if (!approvedSeenTags[attributeKey]) {
              approvedSeenTags[attributeKey] = [];
          }
          if (!instanceSeenTags[attributeKey]) {
              instanceSeenTags[attributeKey] = [];
          }

          if (!_.has(approvedSeenTags[attributeKey], value)) {
              instanceSeenTags[attributeKey].push(value);
              return true;
          }
          return false;
        }
      })
      .reverse()
      .forEach(tag => approvedTags.push(tag));

      // Update seen tags with tags from this instance
      _.keys(instanceSeenTags).forEach((attr) => {
        approvedSeenTags[attr] = _.union(approvedSeenTags[attr], instanceSeenTags[attr])
      });
      instanceSeenTags = {};
      return approvedTags;
    }, []);
  return tagList;
};
var updateTitle = title => {
  document.title = title || document.title;
};
var updateBodyId = (id) => {
  document.body.setAttribute("id", id);
};
var updateBodyClasses = classes => {
  document.body.className = "";
  classes.forEach(cl => {
    if(!cl || cl == "") return;
    document.body.classList.add(cl);
  });
};
var updateTags = (type, tags) => {
  var headElement = document.head || document.querySelector("head");
  var existingTags = headElement.querySelectorAll(`${type}[${HEADER_ATTRIBUTE}]`);
  existingTags = Array.prototype.slice.call(existingTags);
  // Remove any duplicate tags
  existingTags.forEach(tag => tag.parentNode.removeChild(tag));

  if (tags && tags.length) {
    tags.forEach(tag => {
      var newElement = document.createElement(type);
      for (var attribute in tag) {
        if (tag.hasOwnProperty(attribute)) {
            newElement.setAttribute(attribute, tag[attribute]);
        }
      }
      newElement.setAttribute(HEADER_ATTRIBUTE, "true");
      headElement.insertBefore(newElement, headElement.firstChild);
    });
  }
};
var generateTagsAsString = (type, tags) => {
  var html = tags.map(tag => {
  var attributeHtml = Object.keys(tag)
    .map((attribute) => {
        const encodedValue = HTMLEntities.encode(tag[attribute], {
            useNamedReferences: true
        });
        return `${attribute}="${encodedValue}"`;
    })
    .join(" ");
    return `<${type} ${attributeHtml} ${HEADER_ATTRIBUTE}="true" />`;
  });
  return html.join("\n");
};

var reducePropsToState = (propsList) => ({
  title: getTitleFromPropsList(propsList),
  metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.CONTENT], propsList),
  linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
  bodyId: getBodyIdFromPropsList(propsList),
  bodyClasses: getBodyClassesFromPropsList(propsList),
});
var handleClientStateChange = ({title, metaTags, linkTags, bodyId, bodyClasses}) => {
  updateTitle(title);
  updateTags(TAG_NAMES.LINK, linkTags);
  updateTags(TAG_NAMES.META, metaTags);
  updateBodyId(bodyId);
  updateBodyClasses(bodyClasses)
};
var mapStateOnServer = ({title, metaTags, linkTags}) => ({
  title: HTMLEntities.encode(title),
  meta: generateTagsAsString(TAG_NAMES.META, metaTags),
  link: generateTagsAsString(TAG_NAMES.LINK, linkTags)
});

var DocumentMeta = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    titleTemplate: React.PropTypes.string,
    meta: React.PropTypes.arrayOf(React.PropTypes.object),
    link: React.PropTypes.arrayOf(React.PropTypes.object),
    children: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]),
    bodyClasses: React.PropTypes.array,
  },
  render() {
    if (Object.is(React.Children.count(this.props.children), 1)) {
        return React.Children.only(this.props.children);
    } else if (React.Children.count(this.props.children) > 1) {
        return (
            <span>
                {this.props.children}
            </span>
        );
    }
    return null;
  },
});
DocumentMeta = withSideEffect(reducePropsToState, handleClientStateChange, mapStateOnServer)(DocumentMeta);
export { DocumentMeta as default };
