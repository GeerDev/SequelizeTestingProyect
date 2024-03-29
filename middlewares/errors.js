const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    if(errors.length > 1) {
        let chain = "";
        for (let i = 0; i < errors.length; i++) {
          chain += errors[i] + " || ";
        }
        const string = chain.slice(0, -4);
        res.status(400).send({messages: string});
    } else {
        res.status(400).send({messages: errors});
    }
 }

const typeError = (err, req, res, next) => {
    const errOrigin = err.origin
    if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
        return resultadoError = handleValidationError(err, res);
    } else
        if (errOrigin === 'Post') {
            res.status(500).send('Hubo un problema a la hora de crear un Post');
        } else {
            res.status(500).send('Hubo un problema a la hora de crear un Usuario');
        }  
    }

module.exports = { typeError }