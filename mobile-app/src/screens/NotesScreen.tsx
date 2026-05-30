import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import GlassCard
from
'@components/GlassCard';

import Colors
from
'@theme/colors';

import Typography
from
'@theme/typography';

import {
  getNotes,
  Note,
  deleteNote,
  togglePin
} from
'@utils/noteStorage';

import {
  useFocusEffect,
} from
'@react-navigation/native';

import * as Print
from
'expo-print';

import * as Sharing
from
'expo-sharing';

import {
  useNavigation,
} from
'@react-navigation/native';

export default function NotesScreen() {
  const [
    notes,
    setNotes,
  ] = useState<
    Note[]
  >([]);

  const [
  search,
  setSearch,
] = useState(
  ''
);

const [
  selectedTopic,
  setSelectedTopic,
] = useState(
  'All'
);

const navigation =
  useNavigation<
    any
  >();

const topics = [
  'All',
  ...new Set(
    notes.map(
      note =>
        note.topic
    )
  ),
];

const filteredNotes =
  notes
    .filter(
      note => {
        const matchesSearch =
          note.topic
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          note.content
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesTopic =
          selectedTopic ===
            'All' ||
          note.topic ===
            selectedTopic;

        return (
          matchesSearch &&
          matchesTopic
        );
      }
    )
    .sort(
  (
    a,
    b
  ) => {
    if (
      a.pinned ===
      b.pinned
    ) {
      return (
        b.createdAt -
        a.createdAt
      );
    }

    return Number(
      b.pinned
    ) -
    Number(
      a.pinned
    );
  }
);

const pinnedNotes =
  filteredNotes.filter(
    note =>
      note.pinned
  );

const regularNotes =
  filteredNotes.filter(
    note =>
      !note.pinned
  );

  useFocusEffect(
  React.useCallback(
    () => {
      loadNotes();
    },
    []
  )
);

  const loadNotes =
    async () => {
      const data =
        await getNotes();

      setNotes(
        data
      );
    };

    const handleDelete =
        async (
            id: string
        ) => {
            await deleteNote(
            id
            );

        setNotes(
        prev =>
            prev.filter(
            note =>
                note.id !==
                id
            )
        );
    };

    const handlePin =
  async (
    id: string
  ) => {
    const updated =
      await togglePin(
        id
      );

    setNotes(
      [...updated]
    );
  };

    const exportNotesPDF =
  async () => {
    if (
      !notes.length
    ) {
      return;
    }

    const html =
      `
      <h1>
        CN Master
        Revision Notes
      </h1>

      ${notes
        .map(
          note =>
            `
            <h2>
              ${note.topic}
            </h2>

            <p>
              ${note.content}
            </p>

            <hr/>
          `
        )
        .join('')}
    `;

    const result =
      await Print.printToFileAsync(
        {
          html,
        }
      );

    await Sharing.shareAsync(
      result.uri
    );
  };

  return (
    <View
      style={
        styles.root
      }
    >
      <View
  style={
    styles.headerRow
  }
>
  <Text
    style={
      styles.title
    }
  >
    Revision Notes
  </Text>

  <TouchableOpacity
    activeOpacity={
      0.85
    }
    onPress={
      exportNotesPDF
    }
    style={
      styles.exportBtn
    }
  >
    <Ionicons
      name="download"
      size={16}
      color="#fff"
    />

    <Text
      style={
        styles.exportText
      }
    >
      Export
    </Text>
  </TouchableOpacity>
</View>

      <TextInput
  value={
    search
  }
  onChangeText={
    setSearch
  }
  placeholder="Search notes..."
  placeholderTextColor={
    Colors.textMuted
  }
  style={
    styles.searchInput
  }
/>

<ScrollView
  horizontal
  showsHorizontalScrollIndicator={
    false
  }
  style={
    styles.chipRow
  }
>
  {topics.map(
    (topic,index) => (
      <TouchableOpacity
        key={`${topic}-${index}`}
        activeOpacity={
          0.85
        }
        onPress={() =>
          setSelectedTopic(
            topic
          )
        }
        style={[
          styles.chip,

          selectedTopic ===
            topic && {
            backgroundColor:
              Colors.primary,
          },
        ]}
      >
        <Text
          style={[
            styles.chipText,

            selectedTopic ===
              topic && {
              color:'#fff',
            },
          ]}
        >
          {topic}
        </Text>
      </TouchableOpacity>
    )
  )}
</ScrollView>

      <ScrollView
  showsVerticalScrollIndicator={
    false
  }
>
  {!filteredNotes.length ? (
    <View
      style={
        styles.emptyWrap
      }
    >
      <Ionicons
        name="document-text-outline"
        size={64}
        color={
          Colors.textMuted
        }
      />

      <Text
        style={
          styles.emptyTitle
        }
      >
        No Notes Yet
      </Text>

      <Text
        style={
          styles.emptySubtitle
        }
      >
        Save AI explanations
        to build your
        revision notebook.
      </Text>
    </View>
  ) : (
    <>
      {!!pinnedNotes.length && (
        <>
          <Text
            style={
              styles.sectionTitle
            }
          >
            📌 Pinned Notes
          </Text>

          {pinnedNotes.map(
            note => (
              <TouchableOpacity
                key={`${note.id}-${note.createdAt}`}
                activeOpacity={
                  0.9
                }
                onPress={() =>
                  navigation.navigate(
                    'NoteDetail',
                    {
                      note,
                    }
                  )
                }
              >
                <GlassCard
                  style={
                    styles.card
                  }
                >
                  <View
                    style={
                      styles.topicRow
                    }
                  >
                    <Ionicons
                      name="star"
                      size={16}
                      color={
                        Colors.primary
                      }
                    />

                    <Text
                      style={
                        styles.topic
                      }
                    >
                      {note.topic}
                    </Text>
                  </View>

                  <Text
                    style={
                      styles.content
                    }
                  >
                    {note.content}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={
                      0.8
                    }
                    onPress={() =>
                      handlePin(
                        note.id
                      )
                    }
                    style={
                      styles.pinBtn
                    }
                  >
                    <Ionicons
                      name="bookmark"
                      size={14}
                      color={
                        Colors.primary
                      }
                    />

                    <Text
                      style={
                        styles.pinText
                      }
                    >
                      Pinned
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={
                      styles.time
                    }
                  >
                    {new Date(
                      note.createdAt
                    ).toLocaleDateString()}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={
                      0.8
                    }
                    onPress={() =>
                      handleDelete(
                        note.id
                      )
                    }
                    style={
                      styles.deleteBtn
                    }
                  >
                    <Ionicons
                      name="trash"
                      size={14}
                      color={
                        Colors.error
                      }
                    />

                    <Text
                      style={
                        styles.deleteText
                      }
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </GlassCard>
              </TouchableOpacity>
            )
          )}
        </>
      )}

      {!!regularNotes.length && (
        <>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Notes
          </Text>

          {regularNotes.map(
            note => (
              <TouchableOpacity
                key={`${note.id}-${note.createdAt}`}
                activeOpacity={
                  0.9
                }
                onPress={() =>
                  navigation.navigate(
                    'NoteDetail',
                    {
                      note,
                    }
                  )
                }
              >
                <GlassCard
                  style={
                    styles.card
                  }
                >
                  <View
                    style={
                      styles.topicRow
                    }
                  >
                    <Ionicons
                      name="star"
                      size={16}
                      color={
                        Colors.primary
                      }
                    />

                    <Text
                      style={
                        styles.topic
                      }
                    >
                      {note.topic}
                    </Text>
                  </View>

                  <Text
                    style={
                      styles.content
                    }
                  >
                    {note.content}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={
                      0.8
                    }
                    onPress={() =>
                      handlePin(
                        note.id
                      )
                    }
                    style={
                      styles.pinBtn
                    }
                  >
                    <Ionicons
                      name="bookmark-outline"
                      size={14}
                      color={
                        Colors.primary
                      }
                    />

                    <Text
                      style={
                        styles.pinText
                      }
                    >
                      Pin
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={
                      styles.time
                    }
                  >
                    {new Date(
                      note.createdAt
                    ).toLocaleDateString()}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={
                      0.8
                    }
                    onPress={() =>
                      handleDelete(
                        note.id
                      )
                    }
                    style={
                      styles.deleteBtn
                    }
                  >
                    <Ionicons
                      name="trash"
                      size={14}
                      color={
                        Colors.error
                      }
                    />

                    <Text
                      style={
                        styles.deleteText
                      }
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </GlassCard>
              </TouchableOpacity>
            )
          )}
        </>
      )}
    </>
  )}
</ScrollView>
    </View>
  );
}

const styles =
  StyleSheet.create({
    root:{
      flex:1,
      backgroundColor:
        Colors.background,
      padding:20,
    },

    title:{
  color:
    Colors.textPrimary,

  fontSize:28,

  fontWeight:'700',
},

    card:{
      marginBottom:16,
      padding:16,
    },

    topicRow:{
      flexDirection:
        'row',
      alignItems:
        'center',
      marginBottom:10,
    },

    topic:{
      color:
        Colors.primary,
      marginLeft:8,
      fontWeight:'700',
    },

    content:{
      color:
        Colors.textPrimary,
      fontSize:
        Typography.bodyMD,
      lineHeight:24,
    },

    time:{
      marginTop:12,
      color:
        Colors.textMuted,
      fontSize:12,
    },

    deleteBtn:{
    flexDirection:
        'row',
    alignItems:
        'center',
    marginTop:12,
    },

    deleteText:{
    color:
        Colors.error,
    marginLeft:6,
    fontSize:12,
    fontWeight:'600',
    },

    emptyWrap:{
    flex:1,
    justifyContent:
        'center',
    alignItems:
        'center',
    paddingTop:80,
    },

    emptyTitle:{
    color:
        Colors.textPrimary,
    fontSize:22,
    fontWeight:'700',
    marginTop:16,
    },

    emptySubtitle:{
    color:
        Colors.textMuted,
    textAlign:
        'center',
    marginTop:10,
    lineHeight:24,
    },

    searchInput:{
  backgroundColor:
    Colors.surface,

  borderRadius:18,

  paddingHorizontal:16,

  paddingVertical:14,

  color:
    Colors.textPrimary,

  marginBottom:20,

  borderWidth:1,

  borderColor:
    Colors.border,
},

chipRow:{
  marginBottom:18,
},

chip:{
  paddingHorizontal:16,
  paddingVertical:10,
  borderRadius:999,
  backgroundColor:
    Colors.surface,
  marginRight:10,
  borderWidth:1,
  borderColor:
    Colors.border,
},

chipText:{
  color:
    Colors.textSecondary,
  fontWeight:'600',
},

headerRow:{
  flexDirection:
    'row',

  justifyContent:
    'space-between',

  alignItems:
    'center',

  marginBottom:20,
},

exportBtn:{
  flexDirection:
    'row',

  alignItems:
    'center',

  backgroundColor:
    Colors.primary,

  paddingHorizontal:14,

  paddingVertical:10,

  borderRadius:14,
},

exportText:{
  color:'#fff',

  marginLeft:6,

  fontWeight:'700',
},

pinBtn:{
  flexDirection:
    'row',
  alignItems:
    'center',
  marginTop:10,
},

pinText:{
  color:
    Colors.primary,
  marginLeft:6,
  fontSize:12,
  fontWeight:'600',
},

sectionTitle:{
  color:
    Colors.textPrimary,
  fontSize:18,
  fontWeight:'700',
  marginBottom:12,
  marginTop:8,
},
  });