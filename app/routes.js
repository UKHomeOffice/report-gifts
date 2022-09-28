const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

///// NAVIGATION ROUTES START /////
router.post("/gift-on-someones-behalf-redirect", (req, res) => {
  let onSomeonesBehalf = req.session.data["on-someones-behalf"]
  if (onSomeonesBehalf == undefined) {
    res.redirect("gifts/gift-on-someones-behalf-error")
  } else {
    res.redirect("gifts/reporting")
  }
})

router.post("/reporting-redirect", (req, res) => {
  let reporting = req.session.data["reporting"]
  let onSomeonesBehalf = req.session.data["on-someones-behalf"]
  if (reporting == undefined) {
    res.redirect("gifts/reporting-error")
  } else if (reporting != undefined && onSomeonesBehalf == "yes") {
    res.redirect("gifts/on-behalf-of")
  } else if (reporting != undefined && onSomeonesBehalf == "no") {
    res.redirect("gifts/other-party-details")
  }
})

//CDM: Route to employee-lookup.html or other-recipient-or-donor-details.html based on who the gift recipient/donor is
router.post("/on-behalf-of-redirect", (req, res) => {
  let giftOnBehalfOf = req.session.data["on-behalf-of"]
  if (giftOnBehalfOf == "employee") {
    res.redirect("gifts/employee-lookup")
  } else {
    res.redirect("gifts/someone-else-details")
  }
})

router.post("/employee-lookup-redirect", (req, res) => {
  let employeeLookup = req.session.data["employee-lookup"]
  let employeeName = req.session.data["employee-name"]
  let employeeEmail = req.session.data["employee-email"]
  let employeeCCC = req.session.data["employee-cost-centre-code"]

  if (employeeLookup == "" && (employeeName == "" || employeeEmail == "" || employeeCCC == "")) {
    res.redirect("gifts/employee-lookup-error")
  } else {
    res.redirect("gifts/other-party-details")
  }
})

router.post("/someone-else-details-redirect", (req, res) => {
  let name = req.session.data["someone-else-name"]
  let homeOfficeRepresentativeLookup = req.session.data["home-office-representative-lookup"]

  if (name == "" && homeOfficeRepresentativeLookup == "") {
    res.redirect("gifts/someone-else-details-error")
  } else {
    res.redirect("gifts/other-party-details")
  }
})


router.post("/gift-details-redirect", (req, res) => {
  let actionReported = req.session.data["reporting"]
  let giftDate = req.session.data["date-received-or-offered"]
  let giftReason = req.session.data['reason-for-gift']
  let giftCost = req.session.data['cost-of-gift']
  let onSomeonesBehalf = req.session.data["on-someones-behalf"]

  if (giftDate == "" && giftReason == "" && giftCost == "") {
    res.redirect("gifts/gift-details-error")
  }

  if ((actionReported == "gift-received-and-accepted" || actionReported == "gift-received-and-rejected") && onSomeonesBehalf == "no") {
    res.redirect("gifts/summary")
  } else if ((actionReported == "gift-received-and-accepted" || actionReported == "gift-received-and-rejected") && onSomeonesBehalf == "yes") {
    res.redirect("gifts/delegated-authority-approval")
  } else {
    res.redirect("gifts/approved-supplier")
  }
})

//CDM: Skip non-approved-supplier-used-reason.html when an approved supplier is used
router.post("/approved-supplier-redirect", (req, res) => {
  let approvedSupplierUsed = req.session.data["approved-supplier-used"]
  let onSomeonesBehalf = req.session.data["on-someones-behalf"]
  let approverSupplierNotUsedReason = req.session.data["approved-supplier-not-used-reason"]

  if (approvedSupplierUsed == "yes" && onSomeonesBehalf == "yes") {
    res.redirect("gifts/delegated-authority-approval")
  } else if (approvedSupplierUsed == "yes" && onSomeonesBehalf == "no") {
    res.redirect("gifts/summary")
  } else if (approvedSupplierUsed == "no" && approverSupplierNotUsedReason == "") {
    res.redirect("gifts/approved-supplier-reason-error")
  } else if (approvedSupplierUsed == "no" && onSomeonesBehalf == "yes" && approverSupplierNotUsedReason != "") {
    res.redirect("gifts/delegated-authority-approval")
  } else if (approvedSupplierUsed == "no" && onSomeonesBehalf == "no" && approverSupplierNotUsedReason != "") {
    res.redirect("gifts/summary")
  }
})

//CDM: Route to approver-lookup.html or delegated-authority-disapproval-reason.html based on approval value
router.post("/delegated-authority-approval-redirect", (req, res) => {
  let delegatedAuthorityApproval = req.session.data["delegated-authority-approval"]
  if (delegatedAuthorityApproval == "yes") {
    res.redirect("gifts/approver-lookup")
  } else {
    res.redirect("gifts/delegated-authority-disapproval-reason")
  }
})
///// NAVIGATION ROUTES END /////

module.exports = router