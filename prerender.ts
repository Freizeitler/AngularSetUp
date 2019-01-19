// Load zone.js for the server.
import "zone.js/dist/zone-node";
import "reflect-metadata";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

import { enableProdMode } from "@angular/core";
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Import module map for lazy loading
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";
import { renderModuleFactory } from "@angular/platform-server";
import { ROUTES } from "./static.paths";

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require("./server/main");

const BROWSER_FOLDER = join(process.cwd(), "browser");

// generates the sitemap according to https://www.sitemaps.org/protocol.html
function generateSitemap(urlset) {
    const root = 'https://p2p-frontend-angular-prod.azurewebsites.net';
    const priority = 0.5;
    const freq = 'monthly';
    let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    urlset.forEach(route => {
        xml += '<url>';
        xml += '<loc>'+ root + route + '</loc>';
        xml += '<changefreq>'+ freq +'</changefreq>';
        xml += '<priority>'+ priority +'</priority>';
        xml += '</url>';
    })
    xml += '</urlset>';
    return xml;
}

Promise.resolve(generateSitemap(ROUTES)).then(xml => writeFileSync(join(BROWSER_FOLDER, "sitemap.xml"), xml));

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join("browser", "index.html"), "utf8");

let previousRender = Promise.resolve();

// Iterate each route path
ROUTES.forEach(route => {
    const fullPath = join(BROWSER_FOLDER, route);

    // Make sure the directory structure is there
    if (!existsSync(fullPath)) {
        mkdirSync(fullPath);
    }

    // Writes rendered HTML to index.html, replacing the file if it already exists.
    previousRender = previousRender.then(_ => renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    })).then(html => writeFileSync(join(fullPath, "index.html"), html));
});
