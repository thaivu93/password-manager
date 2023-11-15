"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataPassword = void 0;
const getDataPassword = (user_id, client) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT application.app_name, password FROM password 
    JOIN application
    ON password.app_id = application.app_id
    WHERE user_id = ${user_id}`;
    try {
        yield client.connect();
        const data = yield client.query(query);
        return data.rows;
    }
    catch (error) {
        console.error(`Error: ${error}`);
    }
    finally {
        client.end();
    }
    return;
});
exports.getDataPassword = getDataPassword;
