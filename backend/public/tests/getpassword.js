"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
axios_1.default
    .get('http://localhost:3000/passwords')
    .then((response) => {
    const data = response.data;
    console.log(data);
})
    .catch((error) => {
    console.error(error);
});
