const Book = require('../models/book');

exports.index = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  console.log(req.body);

  try {
    const { author, title } = req.body;
    const b = await Book.create({
      author,
      title
    });
    res.status(200).json({ message: "Book was created successfully", book: b });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  console.log(req.body);
  try {
    const { _id, author, title} = req.body;
    const b = await Book.findOneAndUpdate({ _id: _id }, {
      author,
      title
    });
    res.status(200).json({message: 'Person was updated successfully', book: b});
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { _id } = req.body;
    await Book.findOneAndDelete({ _id });
    res.status(200).json({ message: "Book was deleted successfully" });
  } catch (error) {
    next(error);
  }
};
