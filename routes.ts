import * as express from 'express';
import nodeFetch from 'node-fetch';

const api = `${process.env.API_DEST || 'http://localhost:8080'}/api/v1`;
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.redirect('/suppliers');
});

router.get('/suppliers', async (req: express.Request, res: express.Response) => {
    try {
        const response = await nodeFetch(`${api}/suppliers`);
        const data = await response.json();

        res.render('suppliers/index', { data: data.data });
    } catch (e) {
        res.render('error', { data: e });
    }
});

router.get('/suppliers/:category', async (req: express.Request, res: express.Response) => {
    try {
        const response = await nodeFetch(`${api}/suppliers?category=${req.params.category}`);
        const data = await response.json();

        res.render('suppliers/index', { data: data.data });
    } catch (e) {
        res.render('error', { data: e });
    }
});

router.get('/suppliers/:category/:id', async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id.split('_')[1];
        const response = await nodeFetch(`${api}/suppliers/${id}`);
        const data = await response.json();
        const supplier = await data.data;

        res.render('suppliers/details', { supplier });
    } catch (e) {
        res.render('error', { data: e });

    }
});

export default router;
