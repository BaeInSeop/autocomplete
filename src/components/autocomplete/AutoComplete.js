import React, { useEffect, useCallback, useState, useRef } from "react";
// import { ReactTags } from "react-tag-autocomplete";
import ReactTags from "react-tag-autocomplete";
import "./AutoComplete.css";
import Avatar from "./Avatar/Avatar";
import { v4 as uuidv4 } from "uuid";

const AutoComplete = ({
  tags = [],
  onChange,
  suggestions = [],
  allowBackSpace = true,
  allowDuplicate = false,
  allowAddTag = false,
  useSort = true,
  useAvatar = true,
  width = "100%",
  height = "100%",
  placeholder = "Please Enter Text",
  tagDirection = "column",
  tagComponent = null,
  suggestionComponent = null,
}) => {
  const [suggestList, setSuggestList] = useState(
    allowAddTag
      ? suggestions.concat([{ id: 0, name: "", isNew: true }])
      : suggestions
  );

  useEffect(() => {
    const rootDom = document.getElementsByClassName("react-tags")[0];

    if (rootDom) {
      rootDom.setAttribute(
        "style",
        `height : ${0 < tags.length ? "100%" : "auto"}`
      );
    }

    const dom = document.getElementsByClassName("react-tags__selected")[0];

    if (dom) {
      dom.setAttribute(
        "style",
        `max-height: calc(${height} - 25px); margin-block-end: ${
          0 < tags.length ? "10px" : "0"
        }`
      );
    }
  }, [tags]);

  const onInput = (query) => {
    setSuggestList((prev) =>
      prev.map((item) => (item.id === 0 ? { ...item, name: query } : item))
    );
  };

  const onDelete = useCallback(
    (tagIndex) => {
      if (onChange) {
        onChange(tags.filter((_, i) => i !== tagIndex));
      }
    },
    [tags, suggestList]
  );

  const onAddition = useCallback(
    (newTag) => {
      if (!allowDuplicate) {
        const isExist = tags.find(
          (tag) =>
            String(tag.name) === String(newTag.name) &&
            String(tag.id) === String(newTag.id)
        );

        if (isExist) {
          return;
        }
      }

      if (onChange) {
        const target = suggestList.find(
          (item) =>
            String(item.name) === String(newTag.name) &&
            String(item.id) === String(newTag.id)
        );

        if (target) {
          onChange([
            ...tags,
            target
              ? { ...target, id: target.id === 0 ? uuidv4() : target.id }
              : newTag,
          ]);
        }
      }
    },
    [tags, suggestList]
  );

  const sortedSuggestion = useCallback(() => {
    let result = [];

    if (useSort) {
      if (suggestList && suggestList.length) {
        result = suggestList
          .sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            } else if (a.name.toLowerCase() === b.name.toLowerCase()) {
              return 0;
            } else {
              return -1;
            }
          })
          .sort((a, b) => Number(a.priority) - Number(b.priority))
          .sort((a, b) => {
            if (a.isNew) {
              return 1;
            } else if (b.isNew) {
              return -1;
            } else {
              return 0;
            }
          });
      }
    } else {
      result = suggestList;
    }

    return result;
  }, [suggestList]);

  const basicTagComponent = useCallback(
    ({ tag, removeButtonText, onDelete }) => {
      return (
        <button
          type="button"
          title={`Remove : ${tag.name}`}
          onClick={onDelete}
          className={`react-tags__selected-tag`}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            {useAvatar && (
              <Avatar src={tag.picUrl} name={tag.name} round size={16} />
            )}
            {tag.name}
          </div>
        </button>
      );
    },
    []
  );

  const basicSuggestionComponent = useCallback(
    ({ item, query }) => {
      return (
        <div
          id={item.id}
          className={`suggest-container ${
            item.name === query ? "match" : "no-match"
          }`}
        >
          {useAvatar && (
            <div className="avatar">
              <Avatar src={item.picUrl} name={query} round size={25} />
            </div>
          )}

          <div className="text">{item.name}</div>
          {item.isNew && <div className="invite" />}
        </div>
      );
    },
    [suggestList]
  );

  return (
    <div
      style={{
        width,
        height,
      }}
    >
      <ReactTags
        tags={tags}
        suggestions={sortedSuggestion()}
        onInput={onInput}
        onDelete={onDelete}
        onAddition={onAddition}
        tagComponent={tagComponent ? tagComponent : basicTagComponent}
        suggestionComponent={
          suggestionComponent ? suggestionComponent : basicSuggestionComponent
        }
        allowBackspace={allowBackSpace}
        placeholderText={placeholder}
        classNames={{
          root: "react-tags",
          rootFocused: "is-focused",
          selected: `react-tags__selected ${
            tagDirection === "row" ? "row" : "column"
          }`,
          selectedTag: `react-tags__selected-tag`,
          selectedTagName: "react-tags__selected-tag-name",
          search: `react-tags__search ${
            tagDirection === "row" ? "row" : "column"
          }`,
          searchWrapper: "react-tags__search-wrapper",
          searchInput: "react-tags__search-input",
          suggestions: `react-tags__suggestions ${
            tagDirection === "row" ? "row" : "column"
          }`,
          suggestionActive: "is-active",
          suggestionDisabled: "is-disabled",
          suggestionPrefix: "react-tags__suggestion-prefix",
        }}
      />
    </div>
  );
};

export default AutoComplete;
