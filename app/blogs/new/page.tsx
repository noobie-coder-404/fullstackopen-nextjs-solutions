import { createBlog } from "../../actions/blogs";

const NewBlog = () => {
  return (
    <div>
      <h2> Add new blog</h2>
      <form action={createBlog}>
        <div>
          <label>Title</label>
          <input type="text" name="title" required />
        </div>
        <div>
          <label>Author</label>
          <input type="text" name="author" required />
        </div>
        <div>
          <label>URL</label>
          <input type="text" name="url" required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
