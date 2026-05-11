// See https://expressjs.com/en/guide/routing.html for routing

const express = require("express");
const modulesController = require("../controllers/modulesController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

const router = express.Router();

// All routes in this file will use the jwtMiddleware to verify the token and check if the user is an admin.
// Here the jwtMiddleware is applied at the router level to apply to all routes in this file
// But you can also apply the jwtMiddleware to individual routes
router.use(jwtMiddleware.verifyToken, jwtMiddleware.verifyIsAdmin);

router.post("/", modulesController.create);

router.get("/:code", modulesController.retrieveByCode);

router.delete("/:code", modulesController.deleteByCode);

router.put("/:code", modulesController.updateByCode);

router.get("/", modulesController.retrieveAll);

router.post("/table", modulesController.initTable);
// Create a new module
module.exports.create = function create(code, name, credit) {
  return query("CALL create_module($1, $2, $3)", [code, name, credit])
    .then(function (result) {
      console.log("Module created successfully");
    })
    .catch(function (error) {
      throw error;
    });
};
//Update a module by code
module.updateModule = (modCode, modName, modCredit) => {
  const sql = "CALL updateModuleProc(?, ?, ?)";
  dbConn.query(sql, [modCode, modName, modCredit]);
};

module.exports.deleteByCode = function deleteByCode(code) {
  return query("CALL delete_module($1)", [code])
    .then(function (result) {
      console.log("Module deleted successfully");
    })
    .catch(function (error) {
      throw error;
    });
};


// Delete a module by code
// router.post("/deleteModule", (req, res) => {
//   const modCode = req.body.mod_code;

//   modules.deleteModule(modCode, (error, result) => {
//     if (error) {
//       req.flash("error", error.message);
//       return res.redirect("/modules");
//     }

//     req.flash("success", "Module deleted successfully!");
//     res.redirect("/modules");
//   });
// });

module.exports = router;
