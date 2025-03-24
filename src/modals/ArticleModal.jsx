import propTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { notify } from "../api/toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ArticleModal({
  modalMode,
  tempArticle,
  isOpen,
  setIsOpen,
  getArticles,
  setIsScreenLoading,
}) {
  const ToHtml = (state) => stateToHTML(state);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  //   const htmlToPlainText = (html) => html.replace(/<[^>]*>/g, "");
  const productModalRef = useRef(null);
  const [content, setContent] = useState("");
  const [modalData, setModalData] = useState(tempArticle);
  const [updateData,setUpdateData] = useState(tempArticle)
  const handleCloseProductModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
    setContent("");
    setIsOpen(false);
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file-to-upload", file);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/${API_PATH}/admin/upload`,
        formData
      );
      const uploadImageUrl = res.data.imageUrl;
      setModalData({
        ...modalData,
        imageUrl: uploadImageUrl,
      });
    } catch (err) {
      notify(false,err.response.data.message)
    }
  };
  const updateArticle = (item) => {
    setIsScreenLoading(true);
    if (modalMode === "create") {
      axios
        .post(`${BASE_URL}/api/${API_PATH}/admin/article`, { data: item })
        .then((res) => {
          alert(res.data.message);
          handleCloseProductModal();
          setIsScreenLoading(false);
          getArticles();
        })
        .catch((err) => {
          alert(err.response.data.message);
          handleCloseProductModal();
          setIsScreenLoading(false);
        });
    } else {
      axios
        .put(`${BASE_URL}/api/${API_PATH}/admin/article/${item.id}`, {
          data: item,
        })
        .then((res) => {
          alert(res.data.message);
          handleCloseProductModal();
          setIsScreenLoading(false);
          getArticles();
        })
        .catch((err) => {
          alert(err.response.data.message);
          handleCloseProductModal();
          setIsScreenLoading(false);
        });
    }
  };
  const handleModalInputChange = (e) => {
    const { value, name, checked, type } = e.target;
    setModalData({
      ...modalData,
      [name]: type === "checkbox" ? checked : value,
    });
    if(type==="date"){
      setUpdateData({
        ...modalData,
        create_at: Number(Math.floor(new Date(value) / 1000)),
      })
    }
  };
  const handleAllData = () => {
    updateArticle(updateData);
  };
  const pushTag = () => {
    let newTags = [...modalData.tag];
    newTags.push("");
    setModalData({
      ...modalData,
      tag: newTags,
    });
  };
  const deleteTag = (key) => {
    let newTags = [...modalData.tag];
    newTags.splice(key, 1);
    setModalData({
      ...modalData,
      tag: newTags,
    });
  };
  const handleTagInput = (e, key) => {
    const { value } = e.target;
    let newTags = [...modalData.tag];
    newTags[key] = value;
    setModalData({
      ...modalData,
      tag: newTags,
    });
  };

  useEffect(() => {
    const NewContent = ToHtml(editorState.getCurrentContent());
    setContent(NewContent);
  }, [editorState]);
  useEffect(() => {
    new Modal(productModalRef.current, {
      backdrop: false,
    });
  }, []);
  useEffect(() => {
    setModalData((modalData) =>
      setModalData({
        ...modalData,
        content,
      })
    );
  }, [content]);
  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(productModalRef.current);
      modalInstance.show();
      setModalData(tempArticle);
      const blocksFromHTML = convertFromHTML(tempArticle.content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    }
  }, [isOpen, tempArticle]);
  useEffect(() => {
    setModalData({
      ...tempArticle,
      create_at: new Date(tempArticle.create_at * 1000)
        .toISOString()
        .split("T")[0],
    });
  }, [tempArticle]);
  return (
    <>
      {modalData && (
        <div
          className="modal fade"
          id="productModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          ref={productModalRef}
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content border-0">
              <div className="modal-header bg-secondary text-white">
                <h5 className="modal-title" id="exampleModalLabel">
                  {modalMode === "edit" && <span>編輯貼文</span>}
                  {modalMode === "create" && <span>新增貼文</span>}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseProductModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        標題
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        id="title"
                        placeholder="請輸入標題"
                        value={modalData.title}
                        onChange={handleModalInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <img
                        src={modalData.imageUrl}
                        // alt={modalData.title}
                        className="img-fluid object-fit-cover"
                      />
                      <label htmlFor="image" className="form-label">
                        輸入圖片網址
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="image"
                        name="imageUrl"
                        placeholder="請輸入圖片連結"
                        value={modalData.imageUrl}
                        onChange={handleModalInputChange}
                      />
                      <div className="my-3">
                        <label htmlFor="formFile" className="form-label">
                          上傳檔案
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="fileInput"
                          onChange={handleFileChange}
                          accept=".jpg,.jpeg,.png"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="author" className="form-label">
                        作者
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="author"
                        name="author"
                        placeholder="請輸入標題"
                        value={modalData.author}
                        onChange={handleModalInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="create_at">文章建立日期</label>
                      <input
                        type="date"
                        name="create_at"
                        className="form-control"
                        id="create_at"
                        value={modalData.create_at}
                        onChange={handleModalInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <label htmlFor="tag" className="form-label">
                      標籤
                    </label>
                    <div className="row gx-1 mb-3">
                      {modalData.tag.map((label, key) => (
                        <div className="col-md-2 mb-1" key={key}>
                          <div className="input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control form-control"
                              id="tag"
                              placeholder="請輸入標籤"
                              value={modalData.tag[key]}
                              onChange={(e) => handleTagInput(e, key)}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => deleteTag(key)}
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                      {(modalData.tag[modalData.tag.length - 1] ||
                        !modalData.tag.length) && (
                        <div className="col-md-2 mb-1">
                          <button
                            className="btn btn-outline-primary btn-sm d-block w-100"
                            type="button"
                            onClick={pushTag}
                          >
                            新增標籤
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        文章描述
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        className="form-control"
                        id="description"
                        value={modalData.description}
                        placeholder="請輸入文章描述"
                        onChange={handleModalInputChange}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <div
                        style={{ border: "1px, solid, black", height: "300px" }}
                      >
                        <Editor
                          toolbar={{
                            options: ["inline", "textAlign", "history"],
                            inline: {
                              options: ["italic", "bold"],
                              bold: { className: "demo-option-custom" },
                              italic: { className: "demo-option-custom" },
                              underline: { className: "demo-option-custom" },
                              strikethrough: {
                                className: "demo-option-custom",
                              },
                              monospace: { className: "demo-option-custom" },
                              superscript: { className: "demo-option-custom" },
                              subscript: { className: "demo-option-custom" },
                            },
                            blockType: {
                              className: "demo-option-custom-wide",
                              dropdownClassName: "demo-dropdown-custom",
                            },
                            fontSize: {
                              className: "demo-option-custom-medium",
                            },
                          }}
                          initialEditorState={editorState}
                          wrapperClassName="demo-wrapper"
                          editorClassName="demo-editor"
                          onEditorStateChange={(val) => setEditorState(val)}
                          editorState={editorState}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          name="isPublic"
                          className="form-check-input"
                          type="checkbox"
                          id="isPublic"
                          checked={modalData.isPublic}
                          onChange={handleModalInputChange}
                        />
                        <label className="form-check-label" htmlFor="isPublic">
                          是否公開
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCloseProductModal}
                >
                  取消
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAllData}
                >
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ArticleModal.propTypes = {
  modalMode: propTypes.string,
  tempArticle: propTypes.object,
  isOpen: propTypes.bool,
  setIsOpen: propTypes.func,
  getArticles: propTypes.func,
  setIsScreenLoading: propTypes.func,
};

export default ArticleModal;
