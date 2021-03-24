let Constants = Object.freeze({
	header: {
		name: ""
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
    samplePricingTerm: {
        selected: false,
        percent: 0,
        value: 0,
        type: "",
        method: "",
        days: 365,
        date: new Date(),
    },
	samplePricingItem: {
	    selected: false,
		productId: "",
        partNumber: "",
        vendorPartNumber: "",
        type: "",
		name: "",
		description: "",

		quantity: 1,
        unit: "Month",

        costPrice: 0,
        unitPrice: 0,

        margin: 0,
        marginPercent: 0,

        discount: 0,
        discountPercent: 0,

		gross: 0,
		net: 0,
	},
	samplePricingItemMap: {
		productId: "id",
        partNumber: "Product_Code",
        vendorPartNumber: "SKU_No",
        type: "Product_Type",
		name: "Product_Name",
		description: "Product_Description",

        unit: "Usage_Unit",

        costPrice: 0,
        unitPrice: "Unit_Price",

        margin: "Margin_Value",
        marginPercent: "Margin",

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
