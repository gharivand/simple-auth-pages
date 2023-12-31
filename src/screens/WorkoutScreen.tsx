import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Picker} from '@react-native-picker/picker';

import {ApplicationScreenProps} from '../types/navigation';
import {colors, fonts, images, layout} from '../theme';
import {Button, Header} from '../components';
import {StoreContext} from '../context/Store';

const WorkoutScreen: React.FC<ApplicationScreenProps> = ({navigation}) => {
  const {t} = useTranslation(['auth']);
  const {updateUserData} = useContext(StoreContext);
  const [items, setItems] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    setSelectedTime(`${3} ${t('times_a_week')}`);
    const values: string[] = [...Array(7).keys()].map(value => {
      if (value === 0) {
        return t('once_a_week');
      } else {
        return `${value + 1} ${t('times_a_week')}`;
      }
    });
    setItems(values);
  }, [t]);

  const onSubmit = () => {
    if (updateUserData) {
      updateUserData({time_of_week: selectedTime});
      navigation.reset({
        index: 0,
        routes: [{name: 'SuccessScreen'}],
      });
    }
  };

  return (
    <View style={layout.fill}>
      <Image source={images.workout_goal} style={styles.headerImage} />
      <Header />
      <View style={styles.titleContainer}>
        <SafeAreaView>
          <Text style={styles.title}>{t('how_many_times_a_week')}</Text>
        </SafeAreaView>
      </View>
      <SafeAreaView style={layout.colSpaceBetween}>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedTime}
            onValueChange={itemValue => setSelectedTime(itemValue)}>
            {items.map(item => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>
        <Button
          title={t('continue')}
          onPress={onSubmit}
          style={styles.continueButton}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '50%',
  },
  titleContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: 80,
    alignItems: 'center',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  picker: {
    ...Platform.select({
      android: {
        backgroundColor: colors.LIGHT_GRAY,
        color: colors.GREYISH_BROWN,
      },
    }),
  },
  title: {
    ...fonts.textRegular,
    textAlign: 'center',
  },
  continueButton: {
    marginBottom: Platform.select({android: 24}),
  },
});

export default WorkoutScreen;
