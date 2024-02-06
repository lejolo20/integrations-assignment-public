"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getTablesController_1 = require("../controller/getTablesController");
const router = (0, express_1.Router)();
router.post("/gettables", getTablesController_1.postTablesController);
exports.default = router;
