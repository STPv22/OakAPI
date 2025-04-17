import commandManager from "./CommandManager";

var OakAPI = {};

OakAPI['command'] ||= commandManager;

globalThis.OakAPI = OakAPI;