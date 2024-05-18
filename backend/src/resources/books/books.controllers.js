import { pool } from "../../db/connect.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";
import  multer from "multer"

/**
 * @returns book object
 */
async function getBook(id) {
  let sql = "SELECT * FROM books WHERE id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

/**
 * @description Get All book
 * @route GET /books
 */
export const getAllBooks = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT * from books";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ books: rows });
});

/**
 * @description Get Single boook
 * @route GET /books/:id
 */
export const getSingleBook = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  const book = await getBook(id);
  if (!book) return next(createCustomError("book not found", 404));

  return res.status(200).json(book);
});

/**
 * @description Create book
 * @route POST /books
 */

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/images")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})
 
const upload = multer({storage})

export const createBook = tryCatchWrapper(upload.single('file'), async function (req, res, next) {
  const sql = "INSERT INTO books (title, description, autor, created, image) VALUES (?, ?, ?, ?, ?)";
  const values = [ req.body.title, req.body.description, req.body.autor, req.body.created, req.file.filename ] = req.body;

  if (!title || !description)
    return next(createCustomError("All fields are required", 400));

  
  await pool.query(sql, [values]);

  return res.status(201).json({ message: "book has been created" });
});

/**
 * @description Update book
 * @route PATCH /books/:id
 */
export const updateBook = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;
  const { title, description, autor, created } = req.body;

  if (!id || !title || !description)
    return next(createCustomError("All fields are required", 400));

  const book = await getBook(id);
  if (!book) return next(createCustomError("note not found", 404));

  let sql = "UPDATE books SET title = ? , description = ? ,  autor = ? ,  created = ?  WHERE id = ?";
  await pool.query(sql, [title, description, autor, created, id]);

  return res.status(201).json({ message: "book has been updated" });
});

/**
 * @description Delete book
 * @route DELETE /books/:id
 */
export const deleteBook = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;


  if (!id) return next(createCustomError("Id is required", 400));

  const book = await getBook(id);
  if (!book) return next(createCustomError("note not found", 404));

  let sql = "DELETE FROM books WHERE id = ?";
  await pool.query(sql, [id]);

  return res.status(200).json({ message: "book has been deleted" });
});
