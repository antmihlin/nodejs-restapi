const omit = require('lodash').omit;
/*
 * CRUD methods
 */

exports.create = function(req, res, Model) {
    // Create and Save
	let query = req.body.params || req.query;

    if(!query) {
        return res.status(400).send({message: "Item can not be empty"});
    }

    let item = new Model(query);

    item.save(function(err, data) {
        if(err) {
            res.status(500).send({message: err.message});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res, Model) {
    // Retrieve and return all  from the database.
	let query = req.body.params || req.query;
    const { offset, limit } = query;
    query = omit(query, ['offset', 'limit'])
    let result = { count:null, pagesCount:null, value:null, links: null	};

	Model.find(query, null, { skip: +offset, limit: +limit }, function(err, data) {
        if(err) {
            res.status(500).send({message: err.message});
        } else {
            Model.countDocuments(query, (err, count) => {
                if(err) {
                    res.status(500).send({message: err.message});
                } else {
                    result.value = data;
                    result.count = count;
                    res.send(result);
                }
            })
        }
    } );
};

exports.findOne = function(req, res, Model) {
    // Find a single

	let result = { count:null, pagesCount:null, value:null, links: null	};

	Model.findById( req.params.id, function(err, data){
        if(err) {
            res.status(500).send({message: err.message});
        } else {
			result.value = data;
            res.send(result);
        }
    } );
};

exports.update = function(req, res,Model) {
	let query = req.body.params || req.query;
    // Update a item identified by the itemId in the request
    Model.findById(req.params.id, function(err, item) {
        if(err) {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Item not found with id " + query._id});
            }
            return res.status(500).send({message: "Error finding item with id " + query._id});
        }

        if(!item) {
            return res.status(404).send({message: "Item not found with id " + query._id});
        }

		for( let key in query ) item[key] = query[key];

        item.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update item with id " + query._id});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res, Model) {
    // Delete a note with the specified noteId in the request
	let query = req.body.params || req.query;

    Model.findByIdAndRemove(req.params.id, function(err, data) {
        if(err) {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Item not found with id " + query._id});
            }
            return res.status(500).send({message: "Could not delete Item with id " + query._id});
        }

        if(!data) {
            return res.status(404).send({message: "Item not found with id " + query._id});
        }

        res.send({message: "Item deleted successfully!"});
    });
};
