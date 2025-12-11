using my.bookshop from '../db/schema';

service CatalogService {
    entity Books        as projection on bookshop.Books;
    entity Authors      as projection on bookshop.Authors;
    entity BooksArchive as projection on bookshop.BooksArchive;

    function CreateBooks() returns String;
    function DeleteBooks() returns String;
}