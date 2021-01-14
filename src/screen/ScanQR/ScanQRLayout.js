import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native'
import { RNCamera } from 'react-native-camera'
import BarcodeMask from 'react-native-barcode-mask'
import { useIsFocused } from '@react-navigation/native'
import { connect } from 'react-redux'
import { showAlert } from '../../components/Alert'
import Button from '../../components/Button'
import axios from '../../plugin/axios'
import { color } from '../../values'
import { eventGetByID, eventScan } from '../../store/action/event'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { productGetByID } from '../../store/action/product'
import TextField from '../../components/TextField'
import TextFieldWithoutInput from '../../components/TextField/TextFieldWithoutInput'
import DatePicker from '../../components/DatePicker'
import SinglePicker from '../../components/SinglePicker'

import DocumentPicker from 'react-native-document-picker'
import FilePicker from '../../components/FilePicker'

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', paddingBottom: 200 },
  header: { backgroundColor: color.primary, paddingHorizontal: 40, height: 100, alignItems: 'center', justifyContent: 'center' },
  headerText: { color: 'white', fontWeight: '300', fontSize: 18 },
  cameraPanel: { marginTop: 120, flex: 1, height: 100 },
  eventDetail: { flexDirection: 'column', paddingHorizontal: 20, paddingVertical: 10 },
  labelDetail: { fontSize: 10, marginTop: 15, color: 'rgba(0,0,0,.35)' },
  valueDetail: { fontSize: 13, marginTop: 3, color: 'rgba(0,0,0,1)', fontWeight: '300' },
  MainContainer: { flex: 1, justifyContent: 'center' },
  MainContainer2: { flex: 1, marginTop: 10 },
  FacebookStyle: { flexDirection: 'row', alignItems: 'center', backgroundColor: color.primary, borderWidth: .5, borderColor: '#fff', height: 40, borderRadius: 5, margin: 5 },
  ImageIconStyle: { margin: 5, height: 25, width: 25, resizeMode: 'stretch', color: "#fff" },
  TextStyle: { color: "#fff", marginBottom: 4, marginRight: 20 },
  SeparatorLine: { backgroundColor: '#fff', width: 1, height: 40 },
  RetrieveContainer: { paddingHorizontal: 20, paddingTop: 10 }
})

const ScanQRLayout = ({ eventGetByID, eventScan, productGetByID }) => {
  const isFocused = useIsFocused()
  const [qrData, setQrData] = React.useState(null)
  const [product, setProduct] = React.useState([])
  const methods = {
    onQRRead: async (result) => {
      setQrData(!!result.data ? result.data : null)
      return
    },
    getProduct: async () => {
      if (qrData) {
        productGetByID(qrData, (res) => { setProduct(res.success ? res.data : []) })
      }
      return
    },
    editProduct: async (label, val) => {
      setProduct(product.filter((i) => {
        if (i.label === label) {
          i.value = val;
        }
        return i
      }))
    }
  }

  return !isFocused ? (<Text>Navigation is not focuse, so we make the camera is not working</Text>) : (
    <>
      <ScrollView>
        {qrData == null && (
          <View style={styles.container}>
            {(
              <RNCamera
                captureAudio={false}
                style={styles.cameraPanel}
                onBarCodeRead={(e) => methods.onQRRead(e)}>
                <BarcodeMask height={300} edgeColor={'#62B1F6'} showAnimatedLine={true} />
              </RNCamera>
            )}
          </View>
        )}

        <View style={styles.RetrieveContainer}>
          {/* <Button text="Re-Scan QRCode" color={color.primary} textColor="white" size="lg" paddingVertical={12} marginTop={10} borderRadius={4} marginBottom={10} /> */}
          <TextField label="Nomor Seri Produk" value={qrData} />
          <Button text="Retrieve" color={color.primary} textColor="white" size="lg" paddingVertical={12} borderRadius={4} marginBottom={10} onPress={() => { methods.getProduct() }} />
          {product.map(r => {
            if (r.type === "TextBox") {
              return (
                <View>
                  <TextField label={r.label} value={r.value} onChangeText={(t) => { methods.editProduct(r.label, t) }} />
                </View>
              )
            } else if (r.type == "DatePicker") {
              return (
                <View>
                  <DatePicker label={r.label} mode="date" value={r.value} onSelect={(date) => { }} />
                </View>
              )
            } else if (r.type == "Dropdown") {
              return (
                <View >
                  <SinglePicker label={r.label}
                    textExtractor={(item) => { return item.name }}
                    onSelect={(selected) => { }} data={r.options}
                    renderChild={
                      <>
                        <TextFieldWithoutInput value={r.value} label={r.label} />
                      </>
                    } />
                </View>
              )
            } else if (r.type == "Upload") {
              return (
                <View>
                  <FilePicker
                    label={r.label}
                    documentTypes={[DocumentPicker.types.images]}
                    isMultiple={false}
                    onChange={(val) => { }} />
                </View>
              )
            }
          })}
        </View>
      </ScrollView>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    entity: state.entity,
    location: state.location,
    product: state.product,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    eventScan: ({ barcode }, callback) => dispatch(eventScan({ barcode }, callback)),
    eventGetByID: (id, callback) => dispatch(eventGetByID(id, callback)),
    productGetByID: (id, callback) => dispatch(productGetByID(id, callback)),
    activitySetLoading: (isLoading) => dispatch(activitySetLoading(isLoading)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanQRLayout)
