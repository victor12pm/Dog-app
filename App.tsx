import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { defaultDogs, defaultRoutes, defaultWarnings } from "./src/data";
import { DogProfile, RouteItem, WarningCategory, WarningItem, WarningSeverity } from "./src/types";

type Tab = "discover" | "track" | "alerts" | "profile";

const warningCategories: WarningCategory[] = ["bugs", "glass", "poison", "aggressive-dog", "traffic", "heat"];
const severities: WarningSeverity[] = ["low", "medium", "high"];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("discover");
  const [routes] = useState<RouteItem[]>(defaultRoutes);
  const [warnings, setWarnings] = useState<WarningItem[]>(defaultWarnings);
  const [dogs, setDogs] = useState<DogProfile[]>(defaultDogs);

  const [isTracking, setIsTracking] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);

  const [warningCategory, setWarningCategory] = useState<WarningCategory>("bugs");
  const [warningSeverity, setWarningSeverity] = useState<WarningSeverity>("medium");
  const [warningArea, setWarningArea] = useState("");
  const [warningNote, setWarningNote] = useState("");

  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogAge, setDogAge] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      if (!isTracking) {
        return;
      }

      setElapsedSec((prev) => prev + 1);
      setDistanceKm((prev) => Number((prev + 0.0022).toFixed(3)));
    }, 1000);

    return () => clearInterval(id);
  }, [isTracking]);

  const paceText = useMemo(() => {
    if (distanceKm <= 0) {
      return "--";
    }

    const minutes = elapsedSec / 60;
    const pace = minutes / distanceKm;
    return `${pace.toFixed(2)} min/km`;
  }, [distanceKm, elapsedSec]);

  function finishWalk() {
    setIsTracking(false);
    setElapsedSec(0);
    setDistanceKm(0);
  }

  function submitWarning() {
    if (!warningArea.trim() || !warningNote.trim()) {
      return;
    }

    const newWarning: WarningItem = {
      id: `w-${Date.now()}`,
      category: warningCategory,
      severity: warningSeverity,
      area: warningArea.trim(),
      note: warningNote.trim(),
      reportedMinutesAgo: 0
    };

    setWarnings((prev) => [newWarning, ...prev]);
    setWarningArea("");
    setWarningNote("");
  }

  function addDog() {
    const age = Number(dogAge);
    if (!dogName.trim() || !dogBreed.trim() || !Number.isFinite(age) || age <= 0) {
      return;
    }

    const activityLevel: DogProfile["activityLevel"] = age >= 8 ? "low" : age >= 4 ? "medium" : "high";
    setDogs((prev) => [
      ...prev,
      {
        id: `d-${Date.now()}`,
        name: dogName.trim(),
        breed: dogBreed.trim(),
        age,
        activityLevel
      }
    ]);

    setDogName("");
    setDogBreed("");
    setDogAge("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PawPaths</Text>
        <Text style={styles.headerSubtitle}>Walk. Share. Keep dogs safe.</Text>
      </View>

      <View style={styles.tabRow}>
        {[
          ["Discover", "discover"],
          ["Track", "track"],
          ["Alerts", "alerts"],
          ["Profile", "profile"]
        ].map(([label, value]) => (
          <Pressable
            key={value}
            onPress={() => setActiveTab(value as Tab)}
            style={[styles.tabButton, activeTab === value && styles.tabButtonActive]}
          >
            <Text style={[styles.tabLabel, activeTab === value && styles.tabLabelActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {activeTab === "discover" && (
          <>
            <Text style={styles.sectionTitle}>Nearby routes</Text>
            {routes.map((route) => (
              <View key={route.id} style={styles.card}>
                <Text style={styles.cardTitle}>{route.title}</Text>
                <Text style={styles.cardText}>
                  {route.distanceKm} km · {route.difficulty} · updated {route.lastReportMinutesAgo}m ago
                </Text>
                <Text style={styles.tagLine}>{route.tags.join(" • ")}</Text>
              </View>
            ))}
          </>
        )}

        {activeTab === "track" && (
          <>
            <Text style={styles.sectionTitle}>Walk tracking</Text>
            <View style={styles.card}>
              <Text style={styles.metric}>Distance: {distanceKm.toFixed(3)} km</Text>
              <Text style={styles.metric}>Time: {elapsedSec}s</Text>
              <Text style={styles.metric}>Pace: {paceText}</Text>
              <View style={styles.inlineButtons}>
                <Pressable style={styles.primaryButton} onPress={() => setIsTracking((prev) => !prev)}>
                  <Text style={styles.primaryButtonText}>{isTracking ? "Pause" : "Start"}</Text>
                </Pressable>
                <Pressable style={styles.ghostButton} onPress={finishWalk}>
                  <Text style={styles.ghostButtonText}>Finish</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}

        {activeTab === "alerts" && (
          <>
            <Text style={styles.sectionTitle}>Safety warnings</Text>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Create warning</Text>
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.choiceRow}>
                {warningCategories.map((category) => (
                  <Pressable
                    key={category}
                    onPress={() => setWarningCategory(category)}
                    style={[styles.choiceChip, warningCategory === category && styles.choiceChipActive]}
                  >
                    <Text style={styles.choiceChipText}>{category}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.inputLabel}>Severity</Text>
              <View style={styles.choiceRow}>
                {severities.map((severity) => (
                  <Pressable
                    key={severity}
                    onPress={() => setWarningSeverity(severity)}
                    style={[styles.choiceChip, warningSeverity === severity && styles.choiceChipActive]}
                  >
                    <Text style={styles.choiceChipText}>{severity}</Text>
                  </Pressable>
                ))}
              </View>
              <TextInput
                value={warningArea}
                onChangeText={setWarningArea}
                placeholder="Area / landmark"
                style={styles.input}
              />
              <TextInput
                value={warningNote}
                onChangeText={setWarningNote}
                placeholder="What should owners know?"
                multiline
                style={[styles.input, styles.inputMultiline]}
              />
              <Pressable style={styles.primaryButton} onPress={submitWarning}>
                <Text style={styles.primaryButtonText}>Post warning</Text>
              </Pressable>
            </View>

            {warnings.map((warning) => (
              <View key={warning.id} style={styles.card}>
                <Text style={styles.cardTitle}>
                  {warning.category} · {warning.severity}
                </Text>
                <Text style={styles.cardText}>{warning.area}</Text>
                <Text style={styles.cardText}>{warning.note}</Text>
                <Text style={styles.smallText}>{warning.reportedMinutesAgo}m ago</Text>
              </View>
            ))}
          </>
        )}

        {activeTab === "profile" && (
          <>
            <Text style={styles.sectionTitle}>Dog profiles</Text>
            <View style={styles.card}>
              <TextInput value={dogName} onChangeText={setDogName} placeholder="Dog name" style={styles.input} />
              <TextInput value={dogBreed} onChangeText={setDogBreed} placeholder="Breed" style={styles.input} />
              <TextInput
                value={dogAge}
                onChangeText={setDogAge}
                placeholder="Age"
                keyboardType="number-pad"
                style={styles.input}
              />
              <Pressable style={styles.primaryButton} onPress={addDog}>
                <Text style={styles.primaryButtonText}>Add dog</Text>
              </Pressable>
            </View>

            {dogs.map((dog) => (
              <View key={dog.id} style={styles.card}>
                <Text style={styles.cardTitle}>{dog.name}</Text>
                <Text style={styles.cardText}>
                  {dog.breed} · {dog.age} years · activity {dog.activityLevel}
                </Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb"
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937"
  },
  headerSubtitle: {
    color: "#4b5563",
    marginTop: 2,
    marginBottom: 8
  },
  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 8
  },
  tabButton: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    alignItems: "center"
  },
  tabButtonActive: {
    backgroundColor: "#1d4ed8",
    borderColor: "#1d4ed8"
  },
  tabLabel: {
    color: "#334155",
    fontWeight: "600"
  },
  tabLabelActive: {
    color: "#ffffff"
  },
  body: {
    padding: 12,
    paddingBottom: 28,
    gap: 10
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginTop: 10,
    marginBottom: 2
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 8
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827"
  },
  cardText: {
    color: "#374151"
  },
  tagLine: {
    color: "#1d4ed8",
    fontWeight: "600"
  },
  metric: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a"
  },
  inlineButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4
  },
  primaryButton: {
    backgroundColor: "#1d4ed8",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "700"
  },
  ghostButton: {
    borderColor: "#94a3b8",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14
  },
  ghostButtonText: {
    color: "#334155",
    fontWeight: "700"
  },
  inputLabel: {
    fontWeight: "600",
    color: "#334155"
  },
  input: {
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  inputMultiline: {
    minHeight: 72,
    textAlignVertical: "top"
  },
  choiceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6
  },
  choiceChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#ffffff"
  },
  choiceChipActive: {
    backgroundColor: "#dbeafe",
    borderColor: "#60a5fa"
  },
  choiceChipText: {
    color: "#1e293b",
    fontWeight: "500"
  },
  smallText: {
    color: "#64748b",
    fontSize: 12
  }
});
