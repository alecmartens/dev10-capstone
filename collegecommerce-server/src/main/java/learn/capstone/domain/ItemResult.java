package learn.capstone.domain;

import learn.capstone.models.Item;

import java.util.ArrayList;
import java.util.List;

public class ItemResult {
    private final ArrayList<String> messages = new ArrayList<>();
    private Item item;
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

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
