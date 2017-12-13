import React, {
  PureComponent
} from 'react';

import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {
  Avatar,
} from 'react-native-elements';

import FastImage from 'react-native-fast-image';

import { MINDS_URI } from '../../config/Config';
import formatDate from '../../common/helpers/date'

/**
 * Blogs List Item
 */

export default class ListItem extends PureComponent {

  navToBlog = () => {
    this.props.navigation.navigate('BlogView', {blog: this.props.blog});
  }

  render() {
    const blog = this.props.blog;
    const styles = this.props.styles;
    const image = { uri: blog.thumbnail_src };

    return (
      <TouchableOpacity style={styles.listitem} onPress={this.navToBlog} >
        <FastImage source={image} resizeMode={FastImage.resizeMode.cover} style={styles.image} />
        <Text style={styles.title}>{blog.title}</Text>
        <View style={styles.titleContainer}>
          <View style={styles.avatarContainer}>
            <Avatar
              width={35}
              height={35}
              rounded
              source={{ uri: MINDS_URI + 'icon/' + blog.ownerObj.guid + '/medium' }}
            />
            <Text style={styles.text}>{blog.ownerObj.name}</Text>
          </View>
          <Text style={styles.text}>{formatDate(blog.time_created)}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}