import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDirSync } from 'fs-extra';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileService {
	private uploadDir: string;

	constructor() {
		this.uploadDir = join(path, 'uploads');
		ensureDirSync(this.uploadDir);
	}

	async writeFile(name: string, file: Express.Multer.File): Promise<string> {
		name = name + '.' + file.originalname.split('.').pop() || 'jpeg';
		const path = join(this.uploadDir, name);
		await writeFile(path, file.buffer);
		return `/uploads/${name}`;
	}
}
