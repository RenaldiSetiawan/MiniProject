import server from '../server/server'
import chai from 'chai'
import chaiHttp from 'chai-http'

//Assertion
chai.should();
chai.use(chaiHttp);

describe('tours APIs', () => {
    // GET ALL TOURS
    describe("Test Get route /api/tours", () => {
        it("It should return all tours", (done) => {
            chai.request(server)
                .get("/api/tours")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.not.be.eq(0);
                    done();
                });
        });
        // NEGATIVE TES
        it("It should NOT return all tours", (done) => {
            chai.request(server)
                .get("/api/tourssss")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

      // FIND ALL TOUR by tour_id
      describe("GET /api/tours/:id", () => {
          it("It should GET a tours by ID", (done) => {
              const tourId = 19;
              chai.request(server)
                  .get("/api/tours/" + tourId)
                  .end((err, response) => {
                      response.should.have.status(200);
                      response.body.should.be.a('object');
                      response.body.should.have.property('tour_id');
                      response.body.should.have.property('tour_name');
                      response.body.should.have.property('tour_id').eq(19);
                      done();
                  });
          });
          // NEGATIVE TES
          it("It should NOT GET a tour by ID", (done) => {
              const tourId = 123;
              chai.request(server)
                  .get("/api/tours" + tourId)
                  .end((err, response) => {
                      response.should.have.status(404);
                      response.text.should.be.contains("html")
                      done();
                  });
          });
      });

    // TES POST TOURS
    describe("POST /api/tours", () => {
        it("It should POST a new tour", (done) => {
            const tours = {
                tour_name: "Eropa",
                tour_user_id: 56
            };
            chai.request(server)                
                .post("/api/tours/")
                .send(tours)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('tour_name').eq("Eropa");
                    response.body.should.have.property('tour_user_id').eq(56);
                done();
                });
        });
         // NEGATIVE TES
        it("It should NOT POST a new tour without the name property", (done) => {
            const tours = {
                tour_name: undefined,
                tour_user_id: undefined
            };
            chai.request(server)                
                .post("/api/tourss")
                .send(tours)
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });
    });

     /**
     * Test the DELETE route
     */
      describe("DELETE /api/tours/:id", () => {
        it("It should DELETE an existing tour", (done) => {
            const tourId = 83;
            chai.request(server)                
                .delete("/api/tours/" + tourId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a region that is not in the database", (done) => {
            const tourId = 145;
            chai.request(server)                
                .delete("/api/toursss/" + tourId)
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });
});