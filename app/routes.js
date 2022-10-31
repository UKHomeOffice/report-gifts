const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

///// NAVIGATION ROUTES START /////
router.post("/reporting-redirect", (req, res) => {
  let reporting = req.session.data["reporting"]

  if (reporting == undefined) {
    res.redirect("gifts/reporting-error")
  } else {
    res.redirect("gifts/select-reporter")
  }
})

router.post("/select-reporter-redirect", (req, res) => {
  let reporter = req.session.data["reporter"]

  if (reporter == "me") {
    res.redirect("gifts/decision")
  } else if (reporter == "someone-else") {
    res.redirect("gifts/employee-lookup")
  } else if (reporter == "team-unit-department") {
    res.redirect("gifts/team-unit-or-department-details")
  } else {
    res.redirect("gifts/select-reporter-error")
  }
})

router.post("/employee-lookup-redirect", (req, res) => {
  let employeeLookup = req.session.data["employee-lookup"]

  if (employeeLookup == "") {
    res.redirect("gifts/employee-lookup-error")
  } else {
    res.redirect("gifts/decision")
  }
})

router.post("/team-unit-or-department-details-redirect", (req, res) => {
  let name = req.session.data["team-unit-or-department-name"]
  let homeOfficeRepresentativeLookup = req.session.data["home-office-representative-lookup"]

  if (name == "" && homeOfficeRepresentativeLookup == "") {
    res.redirect("gifts/team-unit-or-department-details-error")
  } else {
    res.redirect("gifts/decision")
  }
})

router.post("/gift-more-details-redirect", (req, res) => {
  let giftDate = req.session.data["date-received-or-offered"]
  let giftReason = req.session.data['reason-for-gift']
  let giftCost = req.session.data['cost-of-gift']
  let reporting = req.session.data["reporting"]

  if (giftDate == "" && giftReason == "" && giftCost == "") {
    res.redirect("gifts/gift-more-details-error")
  } else if (reporting == "gift-received") {
    res.redirect("gifts/delegated-authority-approval")
  } else {
    res.redirect("gifts/approved-supplier")
  }
})

router.post("/approved-supplier-redirect", (req, res) => {
  let approvedSupplierUsed = req.session.data["approved-supplier-used"]
  let approverSupplierNotUsedReason = req.session.data["approved-supplier-not-used-reason"]

  if (approvedSupplierUsed == "no" && approverSupplierNotUsedReason == "") {
    res.redirect("gifts/approved-supplier-error")
  } else {
    res.redirect("gifts/delegated-authority-approval")
  }
})

router.post("/delegated-authority-approval-redirect", (req, res) => {
  let delegatedAuthorityApproval = req.session.data["delegated-authority-approval"]
  if (delegatedAuthorityApproval == "yes") {
    res.redirect("gifts/approver-lookup")
  } else {
    res.redirect("gifts/summary")
  }
})
///// NAVIGATION ROUTES END /////

module.exports = router