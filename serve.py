"""Serve the downloaded Diwali experience locally, without upstream requests."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit
from functools import partial
import argparse

ROOT = Path(__file__).resolve().parent
class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = urlsplit(self.path).path
        if path.rstrip('/') in ('', '/diwali', '/diwali/view'):
            self.path = '/local-view.html'
        super().do_GET()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        # The standalone viewer's content, fonts and media all come from this folder.
        self.send_header('Content-Security-Policy', "default-src 'self' data: blob:; script-src 'self' 'unsafe-inline' blob:; style-src 'self' 'unsafe-inline'; connect-src 'self' blob:; font-src 'self' data:; img-src 'self' data: blob:; media-src 'self' blob: data:")
        super().end_headers()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8765)
    args = parser.parse_args()
    print(f'Local Diwali viewer: http://127.0.0.1:{args.port}/diwali/view', flush=True)
    try:
        ThreadingHTTPServer(('127.0.0.1', args.port), partial(Handler, directory=str(ROOT))).serve_forever()
    except KeyboardInterrupt:
        print('\nStopped.')
