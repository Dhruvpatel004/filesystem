const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');


//port number on which server is running
const PORT = 5000;
//directory where files will be stored
const FILES_DIR = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR);
}


// Create a server
const server = http.createServer((req, res) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url);
    // Extract the path and method from the request
    const pathname = parsedUrl.pathname;
    const method = req.method;


    // Handle requests 1 : create a new file
    if (pathname === '/createFile' && method === 'POST') {
        let body = '';

        
        // Read the data from the request
        req.on('data', chunk => {
            body += chunk.toString();
        });
        // When the request has ended
        req.on('end', () => {
            const { fileName, fileContent } = querystring.parse(body);
            const filePath = path.join(FILES_DIR, fileName);

            const fileExist = fs.existsSync(filePath)
            if(fileExist){
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('File already exist');
                return;
            }
            else{
                try
                {
                    const writeFile = fs.writeFileSync(filePath, fileContent, 'utf8');
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('File created successfully');
                }
                catch(err)
                {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error creating file');
                    return;
                }
               
            }

            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error creating file');


        });

    } 
    // Handle requests 2 : read a file  
    else if (pathname === '/readFile' && method === 'GET') {
        //get file name from query string
        const { fileName } = querystring.parse(parsedUrl.query);
        const filePath = path.join(FILES_DIR, fileName);

        //check if file exist or not
        const fileExist = fs.existsSync(filePath);

        if (!fileExist) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        //read file content

        const fileContent = fs.readFileSync(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ fileName, fileContent }));
    }
    

    // Handle requests 3 : view file list
     else if (pathname === '/viewFiles' && method === 'GET') {
        fs.readdir(FILES_DIR, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error listing files');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(files));
        });
    } 
    // Handle requests 4 : update file with it
    else if (pathname === '/deleteFile' && method === 'DELETE') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { fileName } = querystring.parse(body);
            const filePath = path.join(FILES_DIR, fileName);

            fs.unlink(filePath, err => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File deleted successfully');
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
