const { postDemande, getAllDemande} = require('./app');


// test pour faire une demande
it('should create a new demande', async () => {
    const res = await request(app)
      .post('/demande')
      .send({
        token: '671fb98fe3a8ffe9c0ea2697',
        expediteur: 'pierre',
        destinataire: 'Marie',
        type: { troc: true, objetPropose: ['tableau'] },
        message: 'je souhaite faire un troc'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result', true);
  });


  // Test pour récupérer toutes les demandes
  it('should get all demandes', async () => {
    const res = await request(app)
      .get('/demande');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });