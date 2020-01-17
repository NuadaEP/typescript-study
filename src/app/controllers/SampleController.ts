import { Request, Response } from 'express';

import Sample from '../models/SampleModel';
import SampleValidator from '../validators/SampleValidator';

class SampleController {
  public async index(req: Request, res: Response): Promise<Response> {
    const response = await Sample.find();

    return res.json(response);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const response = await Sample.findById(req.params.id);

    return res.json(response);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      await SampleValidator(req.body, 'store');

      const response = await Sample.create(req.body);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      await SampleValidator(req.body, 'update');

      const response = await Sample.findByIdAndUpdate(req.params.id, req.body);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    await Sample.findByIdAndDelete(req.params.id);

    return res.send(true);
  }
}

export default new SampleController();
