import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FULL_ORDER_FRAGMENT } from '../../fragments';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { coockedOrders } from '../../__generated__/coockedOrders';
import { useHistory } from 'react-router-dom';
import { takeOrder, takeOrderVariables } from '../../__generated__/takeOrder';

const ORDERS_SUBSCRIPTION = gql`
  subscription coockedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`;

interface Ilnglat {
  lat: number;
  lng: number;
}

interface IDriver {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriver> = () => (
  <div className="text-lg bg-white w-10 rounded-lg text-center">
    <FontAwesomeIcon
      className=" border-yellow-400 text-gray-800"
      icon={faCar}
    />
  </div>
);
export const DriverBoard = () => {
  const [dPosition, setDposition] = useState<Ilnglat>({
    lng: 0,
    lat: 0,
  });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  // @ts-ignore
  const onSucces = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDposition({ lat: latitude, lng: longitude });
  };
  // @ts-ignore
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSucces, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(dPosition.lat, dPosition.lng));
    }
  }, [dPosition.lat, dPosition.lng]);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(dPosition.lat, dPosition.lng));
    setMap(map);
    setMaps(maps);
  };

  const showRoute = () => {
    if (map) {
      const direction = new google.maps.DirectionsService();
      const directionRender = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: '#000',
          strokeWeight: 2,
        },
      });

      directionRender.setMap(map);
      direction.route(
        {
          origin: {
            location: new google.maps.LatLng(dPosition.lat, dPosition.lng),
          },
          destination: {
            location: new google.maps.LatLng(
              dPosition.lat + 0.05,
              dPosition.lng + 0.05,
            ),
          },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result) => {
          directionRender.setDirections(result);
        },
      );
    }
  };
  const { data: coockedOrdersData } =
    useSubscription<coockedOrders>(ORDERS_SUBSCRIPTION);
  console.log(coockedOrdersData);

  useEffect(() => {
    if (coockedOrdersData?.cookedOrders.id) {
      showRoute();
    }
  }, [coockedOrdersData]);

  const history = useHistory();
  const onCompleted = (data: takeOrder) => {
    if (data.takeOrder.ok) {
      history.push(`/orders/${coockedOrdersData?.cookedOrders.id}`);
    }
  };
  const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(
    TAKE_ORDER_MUTATION,
    {
      onCompleted,
    },
  );
  console.log(onCompleted);

  const takeClick = (orderId: number) => {
    takeOrderMutation({
      variables: {
        input: {
          id: orderId,
        },
      },
    });
    history.push(`/orders/${coockedOrdersData?.cookedOrders.id}`);
  };
  return (
    <div>
      <div
        className="overflow-hidden "
        style={{ width: window.innerWidth, height: '45vh' }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={16}
          draggable={true}
          defaultCenter={{
            lat: 35.689487,
            lng: 139.691706,
          }}
          bootstrapURLKeys={{ key: 'AIzaSyAXUjNYj18qfaUPb7wKNOAIWbW-PlYrWvs' }}
        >
          {/* <Driver lat={dPosition.lat} lng={dPosition.lng} /> */}
        </GoogleMapReact>
      </div>
      {coockedOrdersData?.cookedOrders.restaurant ? (
        <div className=" max-w-screen-sm mt-8 mx-5 md:mx-auto bg-white relative -top-10 shadow-lg py-8 px-5">
          <h1 className="text-center  text-3xl font-medium text-yellow-400">
            New Order
          </h1>
          <h1 className="text-center my-3 text-2xl font-medium">
            Pick it up:{coockedOrdersData?.cookedOrders.restaurant?.name}
          </h1>
          <button
            onClick={() => takeClick(coockedOrdersData?.cookedOrders.id)}
            className="order-btn w-full block  text-center mt-5"
          >
            Accept
          </button>
        </div>
      ) : (
        <div className=" max-w-screen-sm mt-8 mx-5 md:mx-auto bg-gray-400 relative -top-10 shadow-lg py-8 px-5">
          <h1 className="text-center  text-white mx-5 text-3xl font-medium">
            Wait for orders
          </h1>
        </div>
      )}
    </div>
  );
};
