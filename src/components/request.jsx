const request = {
    "id": "-1",
    "name": "Transactions",
    "children": [
        {
            "txn_time": "2023-02-14T00:00:00Z",
            "txn_type": "",
            "id": "304242359777",
            "payment_mode": "UPI P2A",
            "suspicious": false,
            "parent": "-1",
            "destination": "VASU GARG",
            "name": 700,
            "final_amount": 158570.76,
            "children": null
        },
        {
            "txn_time": "2023-02-11T00:00:00Z",
            "txn_type": "",
            "id": "070223",
            "payment_mode": "ATM",
            "suspicious": false,
            "parent": "-1",
            "destination": "ATM-CASH",
            "name": -2000,
            "final_amount": 157870.76,
            "children": null
        },
        {
            "txn_time": "2023-02-05T00:00:00Z",
            "txn_type": "",
            "id": "303236142992",
            "payment_mode": "UPI P2M",
            "suspicious": false,
            "parent": "-1",
            "destination": "Giri Momo",
            "name": -300,
            "final_amount": 157787.76,
            "children": null
        },
        {
            "txn_time": "2023-02-05T00:00:00Z",
            "txn_type": "",
            "id": "303615008007",
            "payment_mode": "IMPS P2A",
            "suspicious": false,
            "parent": "-1",
            "destination": "MYNTRADE",
            "name": 1139,
            "final_amount": 158926.76,
            "children": [
                {
                    "txn_time": "2023-02-07T00:00:00Z",
                    "txn_type": "",
                    "id": "303615008034",
                    "payment_mode": "IMPS P2A",
                    "suspicious": false,
                    "parent": "303615008007",
                    "destination": "MYNTRADE",
                    "name": 944,
                    "final_amount": 159870.76,
                    "children": null
                }
            ]
        },
        {
            "txn_time": "2023-02-14T00:00:00Z",
            "txn_type": "DEBIT",
            "id": "2240920005",
            "payment_mode": "POS",
            "suspicious": false,
            "parent": "-1",
            "destination": "NETFLIX",
            "name": -199,
            "final_amount": 158371.76,
            "children": null
        }
    ]
}

export default request
