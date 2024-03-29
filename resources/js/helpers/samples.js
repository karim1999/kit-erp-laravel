import moment from "moment";

let Constants = Object.freeze({
	header: {
		name: ""
	},
    productTypes: [
        {
            key: "Cloud",
            value: "Cloud",
        },
        {
            key: "Software",
            value: "Software",
        },
        {
            key: "Hardware",
            value: "Hardware",
        },
        {
            key: "Professional Service",
            value: "Professional Service",
        },
        {
            key: "Implementation Service",
            value: "Implementation Service",
        },
        {
            key: "Consultancy",
            value: "Consultancy",
        },
        {
            key: "Field Service",
            value: "Field Service",
        },
        {
            key: "Education and Training",
            value: "Education and Training",
        },
        {
            key: "Annual Maintenance Contract",
            value: "Annual Maintenance Contract",
        },
        {
            key: "Managed Service",
            value: "Managed Service",
        },
    ],
    productTypesToGroup: {
        "Cloud": "software",
        "Software": "software",
        "Hardware": "hardware",
        "Professional Service": "service",
        "Implementation Service": "service",
        "Consultancy": "service",
        "Field Service": "service",
        "Education and Training": "service",
        "Annual Maintenance Contract": "service",
        "Managed Service": "service",
    },
    sampleShipping: {
        contact: "",
        country: "",
        district: "",
        state: "",
        postal: "",
        street: "",
        floor: "",
        building: "",
    },
    sampleBilling: {
        contact: "",
        country: "",
        district: "",
        state: "",
        postal: "",
        street: "",
        floor: "",
        building: "",
    },
    paymentTermsTypes: [
        {
            value: "Advance"
        },
        {
            value: "Before Delivery"
        },
        {
            value: "On Delivery"
        },
        {
            value: "License Issurance"
        },
        {
            value: "Cloud Provisioning"
        },
        {
            value: "TOMA Acceptance"
        },
        {
            value: "Go Live"
        },
        {
            value: "Project Completion"
        },
        {
            value: "Date of Tax Invoice"
        },
        {
            value: "Date of Performa Invoice"
        },
        {
            value: "Purchase Order"
        },
        {
            value: "Before Subscription"
        },
        {
            value: "On Subscription"
        },
        {
            value: "Before Renewal"
        },
    ],
    paymentTermsMethods: [
        {
            value: "Wire Transfer"
        },
        {
            value: "Current Dated Cheque"
        },
        {
            value: "Post Dated Cheque"
        },
        {
            value: "Cash"
        },
        {
            value: "Credit Card"
        },
        {
            value: "Bank Standing Order"
        },
        {
            value: "Bank Direct Debit"
        },
    ],
    pricingTermMap: {
        selected: false,
        percent: "Payment",
        value: "Payment_Value",
        type: "Payment_Type",
        method: "Payment_Method",
        days: "Credit_Days",
        end_date: "Payment_Date",
    },
    samplePricingTerm: {
        selected: false,
        percent: 1,
        value: 0,
        type: "Advance",
        method: "Wire Transfer",
        days: 365,
        end_date: moment().format("MM/DD/YYYY"),
    },
    pricingItemImportOrder: [
        "name",
        "description",
        "vendor_part_number",
        "part_number",
        "type",
        "cost_price",
        "unit_price",
        "quantity",
        "unit",
        "discount_percent",
    ],
	samplePricingItem: {
	    selected: false,
		product_id: "",
        part_number: "",
        vendor_part_number: "",
        type: "Cloud",
		name: "",
		description: "",

		quantity: 1,
        unit: "Month",

        cost_price: 0,
        unit_price: 0,

        margin: 0,
        margin_percent: 0,

        discount: 0,
        discount_percent: 0,

		gross: 0,
		net: 0,
        is_text: false,
	},
	samplePricingItemMap: {
		product_id: "id",
        part_number: "Product_Code",
        vendor_part_number: "SKU_No",
        type: "Product_Group",
		name: "Product_Name",
		description: "Product_Description",

        unit: "Usage_Unit",

        cost_price: 0,
        unit_price: "Unit_Price",

        margin: "Margin_Value",
        margin_percent: "Margin",

        // discount: 0,
        // discountPercent: 0,
        //
		// gross: 0,
		// net: 0,
	},
	// sampleFormItem: {
	// 	partNumber: "",
	// 	name: "",
	// 	description: "",
	// 	quantity: 1,
	// 	inRate: 0,
	// 	outRate: 0,
	// 	margin: 0,
	// 	marginType: "%",
	// 	discount: 0,
	// 	discountType: "%",
	// 	amount: 0,
	// 	actual: 0,
	// 	product_id: 0,
	// 	period: 1,
	// 	periodUnit: "Month",
	// 	unit: "Month",
	// 	isText: false,
	// 	isHeader: false,
	// 	selectedDays: []
	// },
	sampleOpportunity: {
		Expiry: "",
		Stage: "",
		Owner: "",
		Deal_Name: "",
		Engagement_Type: "",
		Entity: "",
		Currency: "",
		Account_Name: "",
		Contact_Name: "",
		status: "Confirmed",
	},
	statusTypes: [
        {
            value: "Draft",
            color: "warning"
        },
        {
            value: "Submitted",
            color: "warning"
        },
        {
            value: "In Review",
            color: "success"
        },
        {
            value: "Revised",
            color: "dark"
        },
        {
            value: "Rejected",
            color: "dark"
        },
        {
            value: "Pending",
            color: "dark"
        },
        {
            value: "Accepted",
            color: "secondary"
        },
        {
            value: "Expired",
            color: "info"
        },
        {
            value: "Archived",
            color: "info"
        }
	],
    quoteStageTypes: [
        {
            value: "Draft",
            color: "warning"
        },
        {
            value: "Negotiation",
            color: "warning"
        },
        {
            value: "Delivered",
            color: "success"
        },
        {
            value: "On Hold",
            color: "dark"
        },
        {
            value: "Confirmed",
            color: "secondary"
        },
        {
            value: "Closed Won",
            color: "info"
        },
        {
            value: "Closed Lost",
            color: "info"
        }
    ],
	approvalStatusTypes: [
		{
			value: "Pre-Approved",
			color: "warning"
		},
		{
			value: "Pending Approval",
			color: "success"
		},
		{
			value: "Revision Required",
			color: "dark"
		},
		{
			value: "Approved",
			color: "secondary"
		},
		{
			value: "Rejected",
			color: "info"
		}
	],
	projectTypes: [
		"Live Event",
		"Installation",
		"FL Recruitment",
		"Ops Staff",
		"Special Project",
		"Other"
	]
});

export default Constants;
