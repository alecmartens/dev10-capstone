package learn.capstone.models;

public enum ItemCondition {
    NEW("NEW"),
    GOOD("GOOD"),
    USED("USED"),
    POOR("POOR");

    ItemCondition(String name) {
        this.name = name;
    }

    private final String name;

    public String getName() {
        return name;
    }
}
