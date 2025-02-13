import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} EasyDo. All rights reserved.
          </p>
          <a
            href="https://github.com/Starkido/easydo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm">View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}