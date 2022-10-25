package learn.capstone.domain;

import learn.capstone.models.Listing;

import java.util.ArrayList;
import java.util.List;

public class ListingResult {
    private final ArrayList<String> messages = new ArrayList<>();
    private Listing listing;
    private ResultType resultType = ResultType.SUCCESS;

    public List<String> getErrorMessages() {
        return new ArrayList<>(messages);
    }

    public void addErrorMessage(String message, ResultType resultType) {
        messages.add(message);
        this.resultType = resultType;
    }

    public void addErrorMessage(String format, ResultType resultType, Object... args) {
        messages.add(String.format(format, args));
        this.resultType = resultType;
    }

    public boolean isSuccess() {
        return resultType == ResultType.SUCCESS;
    }

    public ResultType getResultType() {
        return this.resultType;
    }

    public Listing getListing() {
        return listing;
    }

    public void setListing(Listing listing) {
        this.listing = listing;
    }
}
