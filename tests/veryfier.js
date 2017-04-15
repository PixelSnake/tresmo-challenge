var _ = require("underscore");

exports.Veryfier = class{
    constructor(assert_status, assert_content, next) {
        if (_.verbose)
        {
            console.log("Desired status:  ", assert_status);
            console.log("Desired content: ", assert_content);
        }

        this.assert_status = assert_status;
        this.assert_content = assert_content;
        this.next = next;
    }

    takeNote(x) {
        if (x.status)
            this.status = x.status;
        if (x.content)
            this.content = x.content;

        if (this.status && this.content)
            this.next(this.verify());
    }

    verify() {
        if (_.verbose)
        {
            console.log("Status:  ", this.status);
            console.log("Content: ", this.content);
        }

        return (
            this.status === this.assert_status &&
            _.isEqual(this.content, this.assert_content)
        );
    }
};