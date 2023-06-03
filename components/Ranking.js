import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";

/**
 * @FlatList 사용 출처
 * https://velog.io/@djaxornwkd12/React-Native-FlatList%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90
 */

const renderItem = () => {
  return (
    <View style={styles.renderItem}>
      <StatusBar style="auto" />
      <View>
        <Text>{"ranking"}</Text>
      </View>
      <View>
        <Text>{"userName"}</Text>
      </View>
      <View>
        <Text>{"log"}</Text>
      </View>
      <View>
        <Text>{"winRate"}</Text>
      </View>
    </View>
  );
};

const Ranking = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onEndReached = () => {
    if (loading) {
      return;
    } else {
      getData();
    }
  };
  const getData = () => {
    setLoading(true);
    fetch("http://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.userRankingInfo}>
        <Text style={styles.topFont}>등수</Text>
        <Text style={styles.topFont}>닉네임</Text>
        <Text style={styles.topFont}>전적</Text>
        <Text style={styles.topFont}>승률</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
      ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userRankingInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: "3px",
    borderBottomColor: "#8000FF",
  },
  topFont: {
    fontSize: 20,
    fontWeight: "bold",
  },
  renderItem: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    borderBottomWidth: "0.5px",
  },
});

export default Ranking;
