namespace my.bookshop;

entity Books {
    key ID          : Integer;
    title           : String(111);
    author          : String(111);
    stock           : Integer;
    price           : Decimal(9,2);
}
annotate Books with @cds.query.limit: { default: 50000, max: 50000 };
entity Authors {
    key ID          : Integer;
    name            : String(111);
    country         : String(50);
}
entity BooksArchive {     
    key ID          : Integer;
    title           : String(111);
    author          : String(111);
    stock           : Integer;
    price           : Decimal(9,2);
}