#Mock platForm -dev

>quick start

    run font-end part

        npm start
        visit http://localhost:3000

    run services

        npm run boot
        visit http://localhost:3001

    build project

        npm run dist

>workflow

    font-end:
        edit json/import ->  json schema converter -> json schema -> post to localhost:3001/createSchema
    services:
        1.handle request -> save json schema
        2.handle api request -> read json schema -> respone ->generator data

>interface

    1.getGenteratorData (GET)

    exp:http://localhost:3001/beisen/api/v2/crack/getUserName

    2.createSchema (POST)

    exp:http://localhost:3001/createSchema

    3.getSchemaList (GET)

    exp:http://localhost:3001/getSchemaList#pageNumber
