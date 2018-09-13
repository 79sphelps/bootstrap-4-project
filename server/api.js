"use strict";

/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const Event = require("./models/Event");
const Homepage = require("./models/Homepage");
const Images = require("./models/Images");
const Personel = require("./models/Personel");
const Request = require("./models/Request");
const Testimonials = require("./models/Testimonials");

/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: "RS256"
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf("admin") > -1) {
      next();
    } else {
      res.status(401).send({
        message: "Not authorized for admin access"
      });
    }
  };

  /*
   |--------------------------------------
   | API Routes
   |--------------------------------------
   */

  /*
    const eventsRouter = require('./router/events.router');
    app.use('/apii', eventsRouter);
    const homepageRouter = require('./router/homepage.router');
    app.use('/apii', homepageRouter);
    const imagesRouter = require('./router/images.router');
    app.use('/apii', imagesRouter);
    const personelRouter = require('./router/personel.router');
    app.use('/apii', personelRouter);
    const requestRouter = require('./router/request.router');
    app.use('/apii', requestRouter);
    const testimonialsRouter = require('./router/testimonials.router');
    app.use('/apii', testimonialsRouter);    
    */

  // GET API root
  app.get("/apii/", (req, res) => {
    res.send("API Works");
  });

  // ================================================================
  // Events
  // ================================================================
  const _eventProjection =
    "title location groupSize eventType price purpose description " +
    "viewPublic editable thumbnail";

  app.get("/apii/events", (req, res) => {
    Event.find({}, _eventProjection, (err, events) => {
      let eventsArr = [];
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (events) {
        events.forEach(event => {
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);
    });
  });

  app.get("/apii/events/admin", jwtCheck, adminCheck, (req, res) => {
    Event.find({}, _eventProjection, (err, events) => {
      let eventsArr = [];
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (events) {
        events.forEach(event => {
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);
    });
  });

  app.get("/apii/event/:id", jwtCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!event) {
        return res.status(400).send({
          message: "Event not found."
        });
      }
      res.send(event);
    });
  });

  app.post("/apii/event/new", jwtCheck, adminCheck, (req, res) => {
    Event.findOne(
      {
        title: req.body.title,
        location: req.body.location
      },
      (err, existingEvent) => {
        if (err) {
          return res.status(500).send({
            message: err.message
          });
        }
        if (existingEvent) {
          return res.status(409).send({
            message: "You already have this event."
          });
        }

        const event = new Event({
          title: req.body.title,
          location: req.body.location,
          groupSize: req.body.groupSize,
          eventType: req.body.eventType,
          price: req.body.price,
          purpose: req.body.purpose,
          description: req.body.description,
          viewPublic: req.body.viewPublic,
          editable: req.body.editable,
          thumbnail: req.body.thumbnail
        });

        event.save(err => {
          if (err) {
            return res.status(500).send({
              message: err.message
            });
          }
          res.send(event);
        });
      }
    );
  });

  app.put("/apii/event/:id", jwtCheck, adminCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!event) {
        return res.status(400).send({
          message: "Event not found."
        });
      }

      event.title = req.body.title;
      event.location = req.body.location;
      event.groupSize = req.body.groupSize;
      event.eventType = req.body.eventType;
      event.price = req.body.price;
      event.purpose = req.body.purpose;
      event.description = req.body.description;
      event.viewPublic = req.body.viewPublic;
      event.editable = req.body.editable;
      event.thumbnail = req.body.thumbnail;

      event.save(err => {
        if (err) {
          return res.status(500).send({
            message: err.message
          });
        }
        res.send(event);
      });
    });
  });

  app.delete("/apii/event/:id", jwtCheck, adminCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!event) {
        return res.status(400).send({
          message: "Event not found."
        });
      }
      Event.find(
        {
          _id: req.params.id
        },
        (err, events) => {
          /*
        if (events) {
          events.forEach(event => {
            event.remove();
          });
        }
        */
          event.remove(err => {
            if (err) {
              return res.status(500).send({
                message: err.message
              });
            }
            res.status(200).send({
              message: "Event successfully deleted."
            });
          });
        }
      );
    });
  });

  // ================================================================
  // Testimonials
  // ================================================================
  const _testimonialProjection = "name quote editable";

  app.get("/apii/testimonials", (req, res) => {
    Testimonials.find({}, _testimonialProjection, (err, testimonials) => {
      let testimonialsArr = [];
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (testimonials) {
        testimonials.forEach(testimony => {
          testimonialsArr.push(testimony);
        });
      }

      res.send(testimonialsArr);
    });
  });

  // ================================================================
  // Images
  // ================================================================
  const _imagesProjection = "caption path description editable";

  app.get("/apii/admin/images", (req, res) => {
    Images.find({}, _imagesProjection, (err, images) => {
      let imagesArr = [];
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (images) {
        images.forEach(img => {
          imagesArr.push(img);
        });
      }

      res.send(imagesArr);
    });
  });

  app.get("/apii/admin/images/:id", jwtCheck, (req, res) => {
    Images.findById(req.params.id, (err, image) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!image) {
        return res.status(400).send({
          message: "image not found."
        });
      }
      res.send(image);
    });
  });

  app.post("/apii/admin/images/new", jwtCheck, adminCheck, (req, res) => {
    Images.findOne(
      {
        path: req.body.path,
        caption: req.body.caption
      },
      (err, existingImage) => {
        if (err) {
          return res.status(500).send({
            message: err.message
          });
        }
        if (existingImage) {
          return res.status(409).send({
            message: "You already have this image."
          });
        }

        const image = new Images({
          caption: req.body.caption,
          path: req.body.path,
          description: req.body.description,
          editable: req.body.editable
        });

        image.save(err => {
          if (err) {
            return res.status(500).send({
              message: err.message
            });
          }
          res.send(image);
        });
      }
    );
  });

  app.put("/apii/admin/images/:id", jwtCheck, adminCheck, (req, res) => {
    Images.findById(req.params.id, (err, image) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!image) {
        return res.status(400).send({
          message: "Image not found."
        });
      }

      image._id = req.body._id;
      image.caption = req.body.caption;
      image.path = req.body.path;
      image.description = req.body.description;
      image.editable = req.body.editable;

      image.save(err => {
        if (err) {
          return res.status(500).send({
            message: err.message
          });
        }
        res.send(image);
      });
    });
  });

  app.delete("/apii/admin/images/:id", jwtCheck, adminCheck, (req, res) => {
    Images.findById(req.params.id, (err, image) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!image) {
        return res.status(400).send({
          message: "Image not found."
        });
      }
      Images.find(
        {
          _id: req.params.id
        },
        (err, images) => {
          image.remove(err => {
            if (err) {
              return res.status(500).send({
                message: err.message
              });
            }
            res.status(200).send({
              message: "Image successfully deleted."
            });
          });
        }
      );
    });
  });

  // ================================================================
  // Homepage
  // ================================================================
  const _homepageProjection =
    "welcomeMsg aboutMsg aboutQuote personHighlight personHighlightQuote" +
    " personHighlightBio personHighlightThumbnail" +
    " personHighlightThumbnailCaption editable";

  app.get("/apii/homepage", function(req, res, next) {
    Homepage.find({}, _homepageProjection, (err, homepageDetails) => {
      let homepageArr = [];
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }

      if (homepageDetails) {
        homepageDetails.forEach(homepageDetail => {
          homepageArr.push(homepageDetail);
        });
      }

      res.send(homepageArr[0]);
    });
  });

  app.get("/apii/homepage/:id", jwtCheck, (req, res) => {
    Homepage.findById(req.params.id, (err, homepage) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!homepage) {
        return res.status(400).send({
          message: "Homepage not found."
        });
      }
      res.send(homepage);
    });
  });

  app.put("/apii/homepage/:id", jwtCheck, adminCheck, (req, res) => {
    Homepage.findById(req.params.id, (err, homepage) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!homepage) {
        return res.status(400).send({
          message: "Homepage not found."
        });
      }

      homepage.welcomeMsg = req.body.welcomeMsg;
      homepage.aboutMsg = req.body.aboutMsg;
      homepage.aboutQuote = req.body.aboutQuote;
      homepage.personHighlight = req.body.personHighlight;
      homepage.personHighlightQuote = req.body.personHighlightQuote;
      homepage.personHighlightBio = req.body.personHighlightBio;
      homepage.personHighlightThumbnail = req.body.personHighlightThumbnail;
      homepage.personHighlightThumbnailCaption =
        req.body.personHighlightThumbnailCaption;
      homepage.editable = req.body.editable;

      homepage.save(err => {
        if (err) {
          return res.status(500).send({
            message: err.message
          });
        }
        res.send(homepage);
      });
    });
  });

  // ================================================================
  // Personel
  // ================================================================
  const _personelProjection = "name role editable";

  app.get("/apii/personel", (req, res) => {
    Personel.find({}, _personelProjection, (err, personel) => {
      let personArr = [];
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      //res.set('Content-Type', 'text/html');

      if (personel) {
        personel.forEach(person => {
          personArr.push(person);
        });
      }

      res.send(personArr);
    });
  });

  app.get("/apii/admin/personel", (req, res) => {
    Personel.find({}, _personelProjection, (err, personel) => {
      let personelArr = [];
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (personel) {
        personel.forEach(img => {
          personelArr.push(img);
        });
      }

      res.send(personelArr);
    });
  });

  app.get("/apii/admin/personel/:id", jwtCheck, (req, res) => {
    Personel.findById(req.params.id, (err, personel) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!personel) {
        return res.status(400).send({
          message: "personel not found."
        });
      }
      res.send(personel);
    });
  });

  app.post("/apii/admin/personel/new", jwtCheck, adminCheck, (req, res) => {
    Personel.findOne(
      {
        name: req.body.name,
        role: req.body.role
      },
      (err, existingPersonel) => {
        if (err) {
          return res.status(500).send({
            message: err.message
          });
        }
        if (existingPersonel) {
          return res.status(409).send({
            message: "You already have this personel."
          });
        }

        const personel = new Personel({
          name: req.body.name,
          role: req.body.role,
          editable: req.body.editable
        });

        personel.save(err => {
          if (err) {
            return res.status(500).send({
              message: err.message
            });
          }
          res.send(personel);
        });
      }
    );
  });

  app.put("/apii/admin/personel/:id", jwtCheck, adminCheck, (req, res) => {
    Personel.findById(req.params.id, (err, personel) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!personel) {
        return res.status(400).send({
          message: "Personel not found."
        });
      }

      personel._id = req.body._id;
      personel.name = req.body.name;
      personel.role = req.body.role;
      personel.editable = req.body.editable;

      personel.save(err => {
        if (err) {
          return res.status(500).send({
            message: err.message
          });
        }
        res.send(personel);
      });
    });
  });

  app.delete("/apii/admin/personel/:id", jwtCheck, adminCheck, (req, res) => {
    Personel.findById(req.params.id, (err, personel) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }
      if (!personel) {
        return res.status(400).send({
          message: "Personel not found."
        });
      }
      Personel.find(
        {
          _id: req.params.id
        },
        (err, person) => {
          personel.remove(err => {
            if (err) {
              return res.status(500).send({
                message: err.message
              });
            }
            res.status(200).send({
              message: "Personel successfully deleted."
            });
          });
        }
      );
    });
  });

  // ================================================================
  // Requests
  // ================================================================
  const _requestProjection = "name email message editable";

  app.get("/apii/requests", (req, res) => {
    Request.find({}, _requestProjection, (err, images) => {
      let imagesArr = [];
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }

      if (images) {
        images.forEach(img => {
          imagesArr.push(img);
        });
      }

      res.send(imagesArr);
    });
  });
};
