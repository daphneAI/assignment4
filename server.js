const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const port = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

function safeResolve(basePath, requestPath) {
    const normalized = path.normalize(requestPath).replace(/^\/+/, '');
    return path.join(basePath, normalized);
}

function isSafePath(targetPath, basePath) {
    const relative = path.relative(basePath, targetPath);
    return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}

function sendFile(res, filePath) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
}

function renderDirectoryListing(directoryPath, requestedPath) {
    const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
    const links = entries
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((entry) => {
            const href = path.posix.join(requestedPath, entry.name);
            if (entry.isDirectory()) {
                return `<li><a href="${href}/">${entry.name}/</a></li>`;
            }
            return `<li><a href="${href}">${entry.name}</a></li>`;
        })
        .join('');

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Skills Directory</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 2rem; background: #0f172a; color: #e2e8f0; }
      a { color: #7dd3fc; }
      ul { line-height: 1.8; }
      .container { max-width: 900px; margin: 0 auto; }
      .muted { color: #94a3b8; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Custom Skills</h1>
      <p class="muted">This server is hosting the workspace customizations.</p>
      <ul>${links}</ul>
    </div>
  </body>
</html>`;
}

const server = http.createServer((req, res) => {
    const requestUrl = decodeURIComponent((req.url || '/').split('?')[0]);
    const normalizedUrl = requestUrl === '/' ? '/' : requestUrl.replace(/\\/g, '/');

    let filePath = rootDir;

    if (normalizedUrl === '/') {
        filePath = path.join(rootDir, '.github', 'skills');
        if (!fs.existsSync(filePath)) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<!DOCTYPE html><html><body><h1>No skills folder found</h1><p>Create <code>.github/skills</code> and add SKILL.md files.</p></body></html>`);
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderDirectoryListing(filePath, '/.github/skills'));
        return;
    }

    if (normalizedUrl.startsWith('/.github/skills')) {
        filePath = safeResolve(rootDir, normalizedUrl.slice(1));
    } else {
        filePath = safeResolve(rootDir, normalizedUrl.slice(1));
    }

    if (!isSafePath(filePath, rootDir)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not found');
            return;
        }

        if (stats.isDirectory()) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(renderDirectoryListing(filePath, normalizedUrl.endsWith('/') ? normalizedUrl : `${normalizedUrl}/`));
            return;
        }

        sendFile(res, filePath);
    });
});

server.listen(port, () => {
    console.log(`Skills server running at http://localhost:${port}`);
});
