const path = require("path");
const {v4: uuidv4 } = require('uuid');

/**
 *
 * @param files
 * @param {Array} validExtension - ['png', 'jpg', 'jpeg', 'gif']
 * @param {String} pathTarget - ""
 * @returns {Promise<String>}
 */
const uploadOwnFiles = ({files: files, validExtension = ['png', 'jpg', 'jpeg', 'gif'], pathTarget = ''}) => {

    return new Promise((resolve, reject) =>{

        const {file} = files;
        const nameModified = file.name.split('.');
        const extensionFile = nameModified[nameModified.length - 1];

        if(!validExtension.includes(extensionFile)){
            reject('Tipo de archivo no permitido, las extensiones permitidas son: ' + validExtension.join(', '));
            return;
        }

        const temporalName = uuidv4() + '.' + extensionFile;
        const uploadPath = path.join(__dirname , '../uploads/', pathTarget , temporalName);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
                return ;
            }

            resolve(temporalName);
        });
    });

}

module.exports = {
    uploadOwnFiles
}