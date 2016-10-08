//create api数据结构
{
    "apiName": "getUserData",
    "name": "获取用户数据",
    "method": "GET",
    "note": "备注",
    "company": "beisen",
    "version": "v2",
    "group": "tita",

    "parem": {
        "filter": "name"
    },
    "path": "/beisen/api/v2/tita/getUserData",
    "schema": {
        "type": "object",
        "properties": {
            "user": {
                "type": "object",
                "properties": {
                    "id": {
                        "$ref": "#/definitions/positiveInt"
                    },
                    "name": {
                        "type": "string",
                        "faker": "name.findName"
                    },
                    "email": {
                        "type": "string",
                        "format": "email",
                        "faker": "internet.email"
                    }
                },
                "required": ["id", "name", "email"]
            }
        },
        "required": ["user"],
        "definitions": {
            "positiveInt": {
                "type": "integer",
                "minimum": 0,
                "exclusiveMinimum": true
            }
        }
    }
}
