import HttpServer from "./HttpServer";
import express, { Request, Response } from "express";
import cors from "cors";
import { NextFunction } from "connect";

// framework and driver
export default class ExpressAdapter implements HttpServer {
	app: any;

	constructor () {
		this.app = express();
		this.app.use(express.json());
		this.app.use(cors());
	}

	on(method: string, url: string, callback: Function): void {
		this.app[method](url, async function (req: Request, res: Response, next: NextFunction) {
			try {
				const output = await callback(req.params, req.body, req.headers);
				res.json(output);
			} catch (e: any) {
				next(e);
			}
		});
	}

	listen(port: number): void {
		this.app.listen(port);
	}

}